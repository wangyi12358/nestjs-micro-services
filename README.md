# Nest.js Microservices

## Quick Start

### Install Dependencies
```bash
pnpm install
```

### Generate Prisma Client
```bash
make gen_prisma SERVICE=user
```

### Generate proto ts files
```bash
make proto_gen_ts
```

### Start Services
```bash
make start SERVICE=user
```

## Apps
```json
├─ apps
│  ├─ gateway // gateway service
│  ├─ user // user service
│  │  ├─ src // service code
│  │  │  ├─ resolvers // GraphQL
│  │  │  ├─ controllers // gRPC services
│  │  │  └─ model // GraphQL models
│  │  └─ prisma // service orm
│  └─ libs
│     ├─ grpc // proto files
│     └─ shared // shard code
```

## Links
- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [gRPC](https://grpc.io/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)

## todo-list
1. Link Tracking
2. timescaledb
3. Service Discovery: etcd or Nacos