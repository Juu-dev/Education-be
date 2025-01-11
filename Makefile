.PHONY: clean-unused-packages

APP_NAME=education-backend
DOCKER_DEV=./docker/developer/docker-compose.dev.yml
DB_NAME=education-postgres

all:
	npm run dev

# prisma commands
generate:
	npx prisma generate

migrate:
	npx prisma migrate dev $(name)

migrate-up:
	npx prisma migrate deploy

migrate-down:
	npx prisma migrate reset

migrate-status:
	npx prisma migrate status

seed:
	npx prisma db seed

seed_data:
	npx ts-node prisma/seed_data.ts

clear_data:
	npx ts-node prisma/clear_data.ts

seed-default:
	npx ts-node prisma/2_seed_category.ts
	npx ts-node prisma/3_seed_staff.ts
	npx ts-node prisma/4_seed_customer.ts
	npx ts-node prisma/5_seed_platform.ts
	npx ts-node prisma/6_seed_work_shift.ts

resource:
	npx nest generate resource $(name)

# docker commands
build-docker:
	docker-compose build

init-dev:
	docker-compose -f $(DOCKER_DEV) up --build -d

log:
	docker logs -f $(APP_NAME)

up:
	docker-compose -f $(DOCKER_DEV)  up -d

remove-all:
	docker rm $$(docker ps -aq)

stop:
	docker-compose stop

stop-all:
	docker stop $$(docker ps -aq)

down-all:
	docker down $$(docker ps -aq)

connect-db:
	docker exec -it $(DB_NAME) bash

login-db:
	docker exec -it $(DB_NAME) psql -U education_username -d education_dbß

delete-db:
	docker exec -it $(DB_NAME) psql -U education_username -d postgres -c "DROP DATABASE education_db;"

login-check:
	docker exec -it $(DB_NAME) psql -U postgres

connect-redis:
	docker exec -it redis sh

connect:
	docker exec -it $(APP_NAME) bash

root-connect:
	docker exec -u root -it education-backend bash
	# mkdir logs
	# chmod 777 logs

start-server:
	docker exec -d education-backend npm run start:dev


# combo
restart:
	make stop-all
	make remove-all
	make build-docker
	make up
	make connect

# format code
format:
	npm run lint:fix

# uninstall unused packages
clean-unused-packages:
	@echo "Cài đặt depcheck nếu chưa có..."
	@npm list -g depcheck || npm install -g depcheck
	@echo "Kiểm tra các packages không sử dụng..."
	@UNUSED=$$(depcheck | grep 'Unused dependencies' -A 1 | tail -n 1); \
	if [ -n "$$UNUSED" ]; then \
		echo "Đang gỡ bỏ các packages không sử dụng: $$UNUSED"; \
		for pkg in $$UNUSED; do \
			npm uninstall $$pkg; \
		done; \
	else \
		echo "Không có packages không sử dụng."; \
	fi

# Tools
modules-generate:
	node tools/main.js
