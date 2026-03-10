---
name: mobile-builds
description: Configuración de firma y secrets para generar APK, AAB e IPA en CI/CD (GitHub Actions y GitLab CI). Úsala cuando necesites configurar el keystore de Android, el certificado de iOS, o cuando el job de mobile builds falle por falta de secrets o problemas de firma.
argument-hint: "[plataforma: android | ios | ambas]"
---

# Configuración de builds móviles en CI/CD

## Resumen de secrets necesarios

### GitHub Actions (Settings → Secrets and variables → Actions)

| Secret                     | Plataforma | Descripción                             |
| -------------------------- | ---------- | --------------------------------------- |
| `ANDROID_KEYSTORE_BASE64`  | Android    | Keystore codificado en base64           |
| `ANDROID_KEY_ALIAS`        | Android    | Alias de la clave dentro del keystore   |
| `ANDROID_KEY_PASSWORD`     | Android    | Contraseña de la clave                  |
| `ANDROID_STORE_PASSWORD`   | Android    | Contraseña del keystore                 |
| `IOS_CERTIFICATE_BASE64`   | iOS        | Certificado `.p12` codificado en base64 |
| `IOS_CERTIFICATE_PASSWORD` | iOS        | Contraseña del certificado `.p12`       |
| `IOS_PROVISIONING_PROFILE` | iOS        | Perfil de aprovisionamiento en base64   |
| `IOS_TEAM_ID`              | iOS        | Team ID de tu cuenta de Apple Developer |

### GitLab CI (Settings → CI/CD → Variables)

Los mismos nombres de variable, marcadas como **Protected** y **Masked**.

---

## Android: crear y configurar el keystore

### Paso 1 — Generar el keystore (solo una vez)

```bash
keytool -genkeypair \
  -v \
  -keystore release.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

> Guarda el archivo `release.keystore` y las contraseñas en un gestor de secretos seguro.
> **No lo subas nunca al repositorio.**

### Paso 2 — Codificar el keystore en base64

```bash
# macOS / Linux
base64 -i release.keystore | tr -d '\n' | pbcopy   # copia al portapapeles (macOS)
base64 -i release.keystore | tr -d '\n'             # imprime en terminal
```

El resultado es el valor de `ANDROID_KEYSTORE_BASE64`.

### Paso 3 — Configurar `android/app/build.gradle`

```groovy
android {
  signingConfigs {
    release {
      storeFile file(System.getenv("KEYSTORE_PATH") ?: "release.keystore")
      storePassword System.getenv("ANDROID_STORE_PASSWORD")
      keyAlias System.getenv("ANDROID_KEY_ALIAS")
      keyPassword System.getenv("ANDROID_KEY_PASSWORD")
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
}
```

El workflow de CI decodifica el keystore y lo guarda en `$KEYSTORE_PATH` antes de llamar a Gradle.

### Artefactos generados

| Rama       | Artefacto                     | Uso               |
| ---------- | ----------------------------- | ----------------- |
| `feature/` | `app-debug.apk`               | QA interno        |
| `develop`  | `app-release.apk` + `app.aab` | Distribución beta |
| `main`     | `app-release.apk` + `app.aab` | Google Play       |

---

## iOS: configurar el certificado y el perfil de aprovisionamiento

### Requisitos

- Cuenta activa en [Apple Developer Program](https://developer.apple.com)
- Xcode instalado localmente para exportar el certificado
- Runner de macOS disponible en CI (GitHub: `macos-14`; GitLab: runner con tag `macos`)

### Paso 1 — Exportar el certificado de distribución

1. Abre **Xcode → Settings → Accounts** → selecciona tu equipo
2. Haz clic en **Manage Certificates** → descarga el certificado de distribución
3. Exporta como `.p12` con contraseña desde **Keychain Access → My Certificates**

### Paso 2 — Codificar el certificado en base64

```bash
base64 -i distribution.p12 | tr -d '\n' | pbcopy
```

El resultado es el valor de `IOS_CERTIFICATE_BASE64`.

### Paso 3 — Exportar el perfil de aprovisionamiento

1. Ve a [developer.apple.com/account](https://developer.apple.com/account) → **Profiles**
2. Descarga el perfil `.mobileprovision`
3. Codifícalo:

```bash
base64 -i App_Distribution.mobileprovision | tr -d '\n' | pbcopy
```

El resultado es el valor de `IOS_PROVISIONING_PROFILE`.

### Artefactos generados

| Rama      | Export method | Artefacto | Uso                   |
| --------- | ------------- | --------- | --------------------- |
| `develop` | `ad-hoc`      | `App.ipa` | TestFlight / Firebase |
| `main`    | `app-store`   | `App.ipa` | App Store Connect     |

---

## Dónde están los workflows

- **GitHub Actions**: [.github/workflows/mobile.yml](.github/workflows/mobile.yml)
  - `android` job: `ubuntu-latest`, genera APK y AAB en main/develop
  - `ios` job: `macos-14`, genera IPA en main/develop
  - Filtro de paths: solo se ejecuta cuando cambia `apps/mobile/**` o `packages/shared/**`

- **GitLab CI**: [.gitlab-ci.yml](.gitlab-ci.yml)
  - `build:android` job: imagen `reactnativecommunity/react-native-android`
  - `build:ios` job: runner con tag `macos`, requiere runner self-hosted
  - Ambos usan `rules.changes` para el mismo filtro de paths

---

## Debugging de builds en CI

### Android: el job falla con "keystore not found"

Verifica que el secret `ANDROID_KEYSTORE_BASE64` está configurado y que el workflow
ejecuta este paso antes del build:

```yaml
- name: Decode keystore
  run: |
    echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > /tmp/release.keystore
  env:
    KEYSTORE_PATH: /tmp/release.keystore
```

### iOS: el job falla con "No signing certificate"

1. Comprueba que `IOS_CERTIFICATE_BASE64` e `IOS_CERTIFICATE_PASSWORD` están configurados
2. Verifica que el perfil de aprovisionamiento no ha expirado en Apple Developer
3. Asegúrate de que el Bundle ID del perfil coincide con el de `ios/<App>/Info.plist`

### GitLab CI iOS: el runner no tiene Xcode

Necesitas un runner self-hosted macOS con Xcode instalado.
Regístralo con:

```bash
gitlab-runner register \
  --url https://gitlab.com \
  --registration-token <TOKEN_DEL_PROYECTO> \
  --executor shell \
  --description "macOS runner" \
  --tag-list macos
```

Y arranca el servicio:

```bash
gitlab-runner start
```
