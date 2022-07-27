pipeline {
    agent any
    tools {
        nodejs '18.7.0'
    }

    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build:sit'
            }
        }
    }
}
