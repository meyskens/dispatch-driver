FROM node:14

COPY ./ /opt/driver/
WORKDIR /opt/driver/

RUN npm install

ENV MONGODB_HOST="mongodb:27017"
ENV MONGODB_DB="dispatch"
ENV PORT="80"

CMD node app.js
