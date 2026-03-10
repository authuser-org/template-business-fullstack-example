/**
 * Valida si una cadena es un email con formato correcto.
 *
 * Evita duplicar esta lógica en el form de web, en la app mobile
 * y en la capa de validación de la api.
 *
 * @example isValidEmail("user@example.com") → true
 * @example isValidEmail("not-an-email")      → false
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida si una contraseña cumple los requisitos mínimos:
 * - Al menos 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos un número
 */
export function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

/**
 * Valida si un string es un UUID v4.
 */
export function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
