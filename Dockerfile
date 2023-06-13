FROM node:lts-alpine3.17

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT ["npm","start"]