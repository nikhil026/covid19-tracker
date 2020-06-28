FROM node:14.4.0-alpine3.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app


RUN npm install --no-cache

RUN npm run build

CMD [ "npm", "run", "dev" ]