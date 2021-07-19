FROM node:14.17.1-alpine

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install --only=production

COPY models/ models/
COPY routes/ routes/
COPY utils/ utils/
COPY server.js server.js
COPY users.json users.json

CMD [ "node", "server.js" ]