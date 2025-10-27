FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG PUBLIC_GTM_ID
ARG PUBLIC_FACEBOOK_PIXEL_ID
ENV PUBLIC_GTM_ID=${PUBLIC_GTM_ID}
ENV PUBLIC_FACEBOOK_PIXEL_ID=${PUBLIC_FACEBOOK_PIXEL_ID}

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80