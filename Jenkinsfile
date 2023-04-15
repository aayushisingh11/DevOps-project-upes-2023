pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'composer install' // Install dependencies using Composer
      }
    }
    stage('Test') {
      steps {
        sh 'vendor/bin/phpunit' // Run PHPUnit tests
      }
    }
    stage('Deploy') {
      steps {
        sh 'rm -rf /var/www/html/*' // Remove old files
        sh 'cp -r * /var/www/html/' // Copy new files to Apache directory
        sh 'sudo service apache2 restart' // Restart Apache server
      }
    }
  }
}
