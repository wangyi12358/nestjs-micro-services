export DATABASE_URL=postgresql://postgres:postgre@127.0.0.1:5432

proto_gen_ts:
	npx proto2ts --dir=./libs/grpc/proto

.PHONY: start
start: check-service
	@npx nest start $(SERVICE) --watch

.PHONY: gen_prisma
gen_prisma:
	@npx prisma generate --schema=./apps/$(SERVICE)/prisma/schema.prisma

.PHONY: push_prisma
push_prisma:
	@npx prisma db push --schema=./apps/$(SERVICE)/prisma/schema.prisma

.PHONY: check-service
check-service:
ifndef SERVICE
	$(error SERVICE is not set. Usage: make start service)
endif