# Etapa 1: build do Astro (PARAMETRIZADA)
FROM node:20-alpine AS build
WORKDIR /app

ARG SITE_DOMAIN
ENV SITE_DOMAIN=${SITE_DOMAIN}

COPY package*.json ./
COPY . . 
RUN npm install

# Este comando 'npm run build' agora executa nosso script personalizado!
RUN npm run build

# Etapa 2: Nginx (permanece inalterada)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf