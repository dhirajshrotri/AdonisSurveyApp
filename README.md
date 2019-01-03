# Adonis Survey application

Small aplication to create and view surveys using AdonisJS and MySQL.

To run this application:

1. Install Adonis JS using the command:
    
> npm i -g @adonisjs/cli

2. In the .env file of the project, configure the DB_HOST, DB_PORT, DB_USER and DB_PASSWORD for your database.

3. Using the Adonis CLI, run the migrations using the command:

> adonis migration:run

4. Run the docker.sh script to startup the docker container.