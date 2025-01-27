FROM node:alpine3.20

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]