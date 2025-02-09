pipeline {
    agent any
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['stage', 'prod'],
            description: 'Choose the environment to run tests against'
        )
    }
    environment {
        GITHUB_TOKEN = credentials('c1828ff3-b81e-4981-82e8-a8215dd0309c')  // Ensure the credential ID matches
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    git url: "git@github.com:shubhamsriv979/cambaytiger.git", branch: 'main'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'  // Use shell command for Linux/Unix agents
                    } else {
                        bat 'npm install'  // Use bat for Windows agents
                    }
                }
            }
        }
        stage('Run Cypress Tests') {
            steps {
                script {
                    // // Select test specifications based on the environment parameter
                    // def testSpec = (params.ENVIRONMENT == 'stage') 
                    //     ? "cypress/e2e/Plixlife/stage/Search.js,cypress/e2e/Plixlife/stage/Booking.js,cypress/e2e/Cambaytiger/stage/Search.js,cypress/e2e/Cambaytiger/stage/Booking.js" 
                    //     : "cypress/e2e/Plixlife/prod/Search.js,cypress/e2e/Plixlife/prod/Booking.js,cypress/e2e/Cambaytiger/prod/Search.js,cypress/e2e/Cambaytiger/prod/Booking.js" 
                    
                    // // Run Cypress tests with the selected specifications
                    // if (isUnix()) {
                    //     sh "npx cypress run --headed --spec '${testSpec}'"
                    // } else {
                    //     bat "npx cypress run --headed --spec \"${testSpec}\""
                    // }
                    bat "npx cypress run --headed --spec 'cypress/e2e/Cambaytiger/prod/Booking.js'"
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline completed."
        }
        success {
            echo 'The pipeline completed successfully!'
        }
        failure {
            echo 'The pipeline failed. Check the logs!'
        }
    }
}
