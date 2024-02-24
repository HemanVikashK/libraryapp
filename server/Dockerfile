
FROM node:latest

WORKDIR /91638/Desktop/library/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
