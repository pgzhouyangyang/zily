FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8083

ENTRYPOINT ["npm", "run"]

CMD ["start"]

