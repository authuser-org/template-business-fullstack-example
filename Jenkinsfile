pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    disableConcurrentBuilds()
  }

  environment {
    PNPM_VERSION = '9.0.0'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh '''
          corepack enable
          corepack prepare pnpm@${PNPM_VERSION} --activate
          pnpm install --frozen-lockfile
        '''
      }
    }

    stage('Lint') {
      steps {
        sh 'pnpm lint'
      }
    }

    stage('Build') {
      steps {
        sh 'pnpm build'
      }
    }

    stage('Test') {
      steps {
        sh 'pnpm test'
      }
    }

    stage('Release') {
      when {
        anyOf {
          branch 'main'
          branch 'develop'
        }
      }
      steps {
        script {
          if (!env.GITHUB_TOKEN?.trim()) {
            error('Falta GITHUB_TOKEN en Jenkins para ejecutar semantic-release.')
          }
          if (!env.DOCKER_REGISTRY?.trim()) {
            error('Falta DOCKER_REGISTRY en Jenkins (ej: ghcr.io/org/repo).')
          }
        }

        sh '''
          if [ -n "$GITHUB_ACTOR" ]; then
            echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin
          else
            echo "$GITHUB_TOKEN" | docker login ghcr.io -u "token" --password-stdin
          fi
          pnpm release
        '''
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}