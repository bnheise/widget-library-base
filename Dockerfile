# pull the official base image
FROM node:gallium-alpine3.16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm i
COPY . ./
RUN pnpm run build

FROM node:gallium-alpine3.16 as main
WORKDIR /app
COPY --from=build /app/dist ./
COPY serve.json ./
RUN npm install -g serve
EXPOSE 3000
CMD ["npx", "serve", "-p", "3000"]
