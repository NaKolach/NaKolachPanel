FROM node:25-alpine3.21 AS base

WORKDIR /workspace


FROM base AS build

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.29-alpine3.22

COPY --from=build /workspace/dist /var/www