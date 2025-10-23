FROM node:18-bullseye-slim AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-bullseye-slim
WORKDIR /usr/src/app
RUN npm init -y && npm install express
COPY --from=builder /usr/src/app/build ./build
COPY serve.js .
EXPOSE 3000
CMD ["node", "serve.js"]
