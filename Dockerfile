FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY index.html ./

RUN npm install && npm install -g serve

COPY src/. src/.

RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist"]