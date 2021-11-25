FROM node:16 as build-stage

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json tsconfig.json wait-for-it.sh ./
COPY src ./src
RUN chmod +x ./wait-for-it.sh 

RUN npm install 

EXPOSE 3010
CMD ./wait-for-it.sh -t 15 inventory_db:3306 && npm start
