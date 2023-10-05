pipeline {
    agent any

    stages {
        // stage('SSH to Server') {
        //     steps {
        //         script {
        //             // Sử dụng SSH Agent để kết nối tới máy chủ
        //             sshagent(credentials: ['d-ec2-aws']) {
        //                 // Thực hiện các thao tác SSH trên máy chủ ở đây
        //                 sh 'echo "Connected to server via SSH"'
        //                 sh 'ls -l /path/to/your/remote/directory'
        //                 // Các thao tác khác trên máy chủ
        //             }
        //         }
        //     }
        // }

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

        stage('Build and Push Docker Compose') {
            steps {
                script {
                    // Đảm bảo bạn đã đăng nhập vào Docker Hub trước đó bằng credential Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        // Xây dựng Docker Compose project
                        sh 'docker-compose build'

                        // Đặt lại tên các images nếu cần thiết (docker tag)

                        // Đẩy các images lên Docker Hub
                        sh 'docker-compose push'
                    }
                }
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
                    def stackName = 'devops-ci-cd'

                    // Dừng phiên bản cũ của stack (nếu đang chạy)
                    sh "docker-compose -f docker-compose.yml -p $stackName down --rmi all"

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