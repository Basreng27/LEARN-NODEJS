FROM node:16-alpine

WORKDIR WORKDIR /app/Node-JS

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/main.js"]
