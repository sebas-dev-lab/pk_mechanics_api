FROM node:latest
ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm install
RUN npm install nodemon -g
COPY . .
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh
EXPOSE 8090
CMD [ "npm", "run","dev" ]
