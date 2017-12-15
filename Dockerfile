FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

ENTRYPOINT ["./docker/entrypoint.sh"]

CMD ["yarn", "start"]