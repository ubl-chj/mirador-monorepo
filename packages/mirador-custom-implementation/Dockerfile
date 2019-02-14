FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Mirador Custom Implementation"

WORKDIR /srv/mirador
RUN git clone https://github.com/ubl-chj/mirador-monorepo.git ./
RUN npm i npm@latest -g
WORKDIR /srv/mirador/packages/mirador-viewer
RUN npm install
WORKDIR /srv/mirador/packages/mirador-component
RUN npm install
RUN npm run bundle
WORKDIR /srv/mirador/packages/mirador-custom-implementation
RUN npm install
RUN npm run build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
