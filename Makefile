export DATABASE_URL=postgresql://postgres:wangyi12358@127.0.0.1:5432

# 定义默认目标
.PHONY: start
start: check-service
	@npx nest start $(SERVICE) --watch

# 确保 SERVICE 变量已设置
.PHONY: check-service
check-service:
ifndef SERVICE
	$(error SERVICE is not set. Usage: make start service)
endif

gen_proto:
	npx protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./simple.proto