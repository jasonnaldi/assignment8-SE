FROM node:11-slim AS client

WORKDIR /client

COPY ./client .

RUN npm install
RUN npm run build



FROM node:11-slim AS server

WORKDIR /src
COPY ./server .
COPY --from=client /client/dist ./public

RUN npm install

CMD [ "node", "./index.js" ]
