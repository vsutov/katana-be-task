FROM node:18

WORKDIR /usr/src/app

RUN chown node:node ./

USER node

ARG NODE_ENV=production

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]