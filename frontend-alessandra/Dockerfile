# Etapa 1: Build
FROM node:20-bullseye-slim AS builder
WORKDIR /usr/src/app

# Copiar solo package.json y lock para instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del proyecto y generar build de Vite
COPY . .
RUN npm run build

# Etapa 2: Servir el build
FROM node:20-bullseye-slim
WORKDIR /usr/src/app

# Instalar serve globalmente para servir la carpeta build
RUN npm install -g serve

# Copiar el build generado en la etapa anterior
COPY --from=builder /usr/src/app/build ./build

# Exponer puerto
EXPOSE 3000

# Comando para servir la app en producción
CMD ["serve", "-s", "build", "-l", "3000"]
