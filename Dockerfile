FROM node:20.8.1 as build

WORKDIR /app

COPY ./weather/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./weather ./

RUN npm run build

EXPOSE 3000




FROM nginx:1.21-alpine as publish

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]