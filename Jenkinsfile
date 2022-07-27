pipeline {
    agent any
    tools {
        nodejs '18.7.0'
    }

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
                sh 'npm version'
            }
        }
    }
}
