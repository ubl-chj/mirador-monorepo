FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Mirador React Implementation"

WORKDIR /srv/mirador
RUN git clone https://github.com/ubl-chj/mirador-monorepo.git ./
RUN npm i npm@latest -g
RUN npm install --global lerna
WORKDIR /srv/mirador
RUN lerna bootstrap --hoist
RUN lerna run bundle
RUN lerna run --scope mirador-react-implementation build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
