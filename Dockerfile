# Etapa 1: build do Astro
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # gera /dist

# Etapa 2: Nginx pra servir o dist
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# remove config default e copia nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
