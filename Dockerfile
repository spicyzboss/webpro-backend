FROM node:16-alpine

COPY . /app

WORKDIR /app

RUN yarn install --prod --frozen-lockfile

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
