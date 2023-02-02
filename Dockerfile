FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY  default.conf /etc/nginx/conf.d/
COPY ./dist/garbage-fe/ /usr/share/nginx/html/

ENV PROXY_API=$PROXY_API

EXPOSE 80