FROM node:8

WORKDIR . /app

COPY package*.json ./

RUN npm install

RUN npm i -g @adonisjs/cli

COPY . .

EXPOSE 8080

RUN adonis migration:run

RUN adonis seed

CMD [ "npm", "start" ]