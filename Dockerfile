FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

#ENV PORT $API_PORT

#RUN ./node_modules/.bin/knex migrate:latest --knexfile ./knexfile.js

CMD ["npm", "start"]