FROM node:20 as builder
WORKDIR /build

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install

COPY ./ ./

RUN pnpm prisma:generate && pnpm build

FROM node:20-alpine as prod

WORKDIR /opt/app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  && echo 'Asia/Shanghai' >/etc/timezone


COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

EXPOSE 4001

CMD ["node", "./dist/apps/user/src/main"]