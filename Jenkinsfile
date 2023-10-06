pipeline {
    agent any
    stages {
        stage('SSH to Server') {
            steps {
                script {
                    // Sử dụng SSH Agent để kết nối tới máy chủ
                    sshagent(credentials: ['d-ec2-aws']) {
                        sh """
                            ssh ec2-user@ec2-47-128-66-233.ap-southeast-1.compute.amazonaws.com
                            cd /home/ec2-user
                            ls /home/ec2-user
                        """
                    }
                }
            }
        }
    }
}