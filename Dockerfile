FROM node:18.14.0-alpine3.17

WORKDIR /var/project/app

COPY . .

RUN npm install && npx tsc

EXPOSE 8080

CMD [ "node", "dist/main.js" ]