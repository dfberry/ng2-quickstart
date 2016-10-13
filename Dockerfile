# To build and run with Docker:
#
#  $ docker build -t ng-quickstart .
#  $ docker run -it -p 3000:3000 -p 3001:3001 -v /Users/dfberry/repos/quickstart:/quickstart -d dfberry/ng2-quickstart tail -f /dev/null
#  $ docker exec -it 53b3ad840c46 /bin/bash

FROM node:latest

RUN mkdir -p /quickstart /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /quickstart
COPY package.json typings.json /quickstart/
RUN npm install --unsafe-perm=true

COPY . /quickstart
RUN chown -R nodejs:nodejs /quickstart
USER nodejs

CMD [ "npm", "start" ]



