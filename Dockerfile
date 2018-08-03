ARG ARCHREPO
FROM ${ARCHREPO}/node:10-stretch

ARG QEMU_ARCH
COPY qemu-${QEMU_ARCH}-static /usr/bin/

COPY ./ /opt/driver/
WORKDIR /opt/driver/

RUN npm install

ENV MONGODB_HOST="mongodb:27011"
ENV MONGODB_DB="dispatch"
ENV DISABLE_CORS="true"
ENV PORT="80"

CMD node app.js
