FROM node:14.12.0-buster-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY gatsby* .

COPY src/ src/

RUN npm run build


FROM nginx:alpine

COPY --from=build --chown=nginx:nginx /app/public /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/

EXPOSE 80

HEALTHCHECK CMD ['wget', '-q', 'localhost:80']
