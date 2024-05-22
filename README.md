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
│  │  │  ├─ button.tsx // 组件实现，文件名与组件名称相同
│  │  │  └─ index.ts // 组件导出，不推荐使用默认导出
│  │  └─ prisma // service orm
│  └─ libs
│     ├─ grpc 
│     └─ shared 
```

## Links
- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [gRPC](https://grpc.io/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)