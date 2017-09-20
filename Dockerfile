FROM node as builder
WORKDIR /code
COPY . .
RUN yarn && yarn run ng build --aot

FROM nginx
MAINTAINER Toby Harris <tobyharris93@gmail.com>
COPY --from=builder /code/dist /usr/share/nginx/html