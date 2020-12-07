FROM node:lts-alpine as node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node app/dist/travel /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
