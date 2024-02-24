
FROM node:latest

WORKDIR /91638/Desktop/library/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
