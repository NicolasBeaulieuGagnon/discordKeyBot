FROM node:alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "./src/keyBot.js"]
