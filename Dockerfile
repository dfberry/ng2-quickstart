# Dockerfile 
#  $ docker build -t ngrx-counter .
#  $ docker run -it -p 3000:3000 -v /Users/dfberry/repos/:/home/nodejs/repos/ ngrx-counter 


# base image 
FROM node:latest

RUN mkdir -p /home/nodejs/repos && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /home/nodejs/repos
RUN git clone -b rxjs-store https://github.com/dfberry/ng2-quickstart counter && cd counter
RUN npm install --unsafe-perm=true

USER nodejs

CMD npm start