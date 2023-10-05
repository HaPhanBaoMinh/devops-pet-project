pipeline {
    agent any

    stages {
        stage('Version control') {
            steps {
                sh '''
                    docker version
                    docker info
                    docker-compose version
                    git --version
                '''
            }
        }

        stage('Prune Docker volumes') {
            steps {
                sh 'docker system prune -a --volumes -f' 
            }
        }

        stage('Docker compose dow') {
            steps {
                sh 'docker-compose down' 
            }
        }

        stage('Start container') {
            steps {
               sh 'docker-compose up -d'
               sh 'docker-compose ps'
            }
        }
    }
}