node {
                    docker.image('node:boron').inside {

                            def retstat = sh(script: 'docker service inspect microservice-nodejs', returnStatus: true)

                            stage ('checkout') {
                                git url : 'https://github.com/NirbyApp/mitosis-microservice-nodejs-angular.git'
                            }

                            stage ('install') {
                                sh 'yarn'
                            }

                            stage ('test') {
                            }

                            stage ('build') {
                                sh 'npm run build:client-prod'
                                sh 'npm run build:server'
                            }

                            stage ('deploy'){
                                sh 'docker build -t mitosis/microservice-nodejs:1 .'
                                if (retstat != 1) {
                                  // sh 'docker service update --replicas 2 --image mitosis/microservice-nodejs:1 microservice-nodejs:1'
                                  sh 'docker service rm microservice-nodejs'
                                }
                                sh 'docker service create --name microservice-nodejs --log-driver=gelf --log-opt gelf-address=udp://${MANAGER_IP}:12201 --publish 9992:4000 --publish 9993:5000 --network microservices-net --network ${APP_NAME}-net --replicas 2 mitosis/microservice-nodejs:1'
                            }
                     }
                 } 
