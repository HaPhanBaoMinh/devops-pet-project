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

        stage('Stop and Remove Previous Version') {
            steps {
                script {
                    // Tên Docker Compose stack cần dừng và xóa
                    def stackName = 'my-docker-stack'

                    // Dừng phiên bản cũ của stack (nếu đang chạy)
                    sh "docker-compose -f docker-compose.yml -p $stackName down"

                    // Xóa phiên bản cũ của stack (nếu tồn tại)
                    sh "docker-compose -f docker-compose.yml -p $stackName rm -f"
                }
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