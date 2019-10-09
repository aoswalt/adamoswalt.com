FROM node AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build --chown=nginx:nginx /app/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK CMD ['wget', '-q', 'localhost:80']
