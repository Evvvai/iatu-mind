FROM node:16

ENV NODE_ENV development
ENV PORT 3000

EXPOSE 80 443 3000

RUN mkdir -p /client
WORKDIR /client

COPY package*.json /client/
RUN yarn install

COPY . /client

CMD "yarn" "start"