# Dockerfile 
#  $ docker build -t quickstart-ngrx .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 -v /Users/dfberry/repos/quickstart-ngrx:/home/nodejs/quickstart-ngrx dfberry/ng2-all tail 

#tail -f /dev/null 
# base image 
FROM node:latest

RUN mkdir -p /quickstart /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

RUN
WORKDIR /home/nodejs/quickstart-ngrx
COPY package.json /home/nodejs/quickstart-ngrx/
RUN npm install --unsafe-perm=true

COPY . /home/nodejs/quickstart-ngrx
RUN chown -R nodejs:nodejs /quickstart
USER nodejs

#CMD npm start