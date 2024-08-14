# プラットフォームと環境を設定
PLATFORM=web
ENV=local

# 初期化コマンド
.PHONY: init
init:
	# 必要なツールがインストールされているかチェック
	sh ./bin/check_install.sh
	# Supabaseにログイン
	supabase login
	# Supabaseを初期化
	yes 'N' | supabase init --force
	# Supabaseを起動
	supabase start
	# シークレットの設定があればコピー
	if [ -d "env/secrets.env" ]; then \
		cp env/secrets.env.example env/secrets.env; \
	fi
	# プロジェクト名を.envに書き込む
	echo "PROJECT_NAME=$$(basename $$(pwd))" > .env
	# yarnのバージョンを設定し、依存関係をインストール
	corepack enable
	yarn set version 4.1.0
	yarn install
	# フロントエンドとバックエンドの依存関係もインストール
	cd frontend && yarn set version 4.1.0 && yarn install
	# データベースのマイグレーションとモデルのビルドを実行
	make init-migration
	make build-model
	@echo "Woo-hoo! Everything's ready to roll!"

# ローカル環境での起動コマンド
.PHONY: local
local:
	# プロジェクト名を設定
	export PROJECT_NAME=$$(basename $$(pwd))
	# Supabaseを起動
	supabase start
	# Docker Composeでサービスを起動
	docker-compose -f ./docker-compose.frontend.yaml -f ./docker-compose.ai.yaml -f ./docker-compose.backend.yaml up -d --force-recreate
	cd frontend && yarn dotenv -e ../env/${ENV}.env -- yarn web

# ローカル環境での停止コマンド
.PHONY: local-stop
local-stop:
	docker-compose -f ./docker-compose.frontend.yaml -f ./docker-compose.ai.yaml -f ./docker-compose.backend.yaml down
	supabase stop

# iOS用のローカル起動コマンド
.PHONY: local-ios
local-ios:
	# プロジェクト名を設定
	export PROJECT_NAME=$$(basename $$(pwd))
	# Supabaseを起動
	supabase start
	# Docker Composeでサービスを起動
	docker-compose -f ./docker-compose.blockchain.yaml  ./docker-compose.backend.yaml up -d

# Android用のローカル起動コマンド
.PHONY: local-android
local-android:
	# プロジェクト名を設定
	export PROJECT_NAME=$$(basename $$(pwd))
	# Supabaseを起動
	supabase start
	# Docker Composeでサービスを起動
	docker-compose -f ./docker-compose.blockchain.yaml ./docker-compose.backend.yaml up -d

# チェックコマンド
.PHONY: check
check:
	# プロジェクト名を設定
	export PROJECT_NAME=$$(basename $$(pwd))
	# Supabaseを起動
	supabase start
	# Docker Composeの設定を変換
	docker-compose -f ./docker-compose.blockchain.yaml convert

# Prismaのモデルをビルド
.PHONY: build-model-frontend-prisma
build-model-frontend-prisma:
	npx prisma generate --schema=./prisma/schema.prisma --generator frontendClient

# Supabaseのモデルをビルド
.PHONY: build-model-frontend-supabase
build-model-frontend-supabase:
	# Supabaseを起動
	supabase start
	# モデルの型を生成
	$(eval DIR_PATH := "./frontend/packages/app/shared/type/supabase/__generated__")
	mkdir -p $(DIR_PATH) && supabase gen types typescript --local > $(DIR_PATH)/schema.types.ts

.PHONY: build-model-prisma
build-model-prisma:
	# フロントエンドのモデルをビルド
	make build-model-frontend-prisma

# Edge functionsのモデルをビルド
.PHONY: build-model-functions
build-model-functions:
	# Supabaseを起動
	supabase start
	# モデルの型を生成
	mkdir -p ./supabase/functions/domain/entity/__generated__ && supabase gen types typescript --local > ./supabase/functions/domain/entity/__generated__/schema.ts

# フロントエンドのモデルをビルド
.PHONY: build-model-frontend-graphql
build-model-frontend-graphql:
	# Supabaseを起動
	supabase start
	# マイグレーションを実行
	make migration
	# コードを生成
	cd frontend && yarn codegen:supabase

# モデルをビルド
.PHONY: build-model
build-model:
	# フロントエンドのモデルをビルド
	make build-model-frontend-supabase
	# Edge functionsのモデルをビルド
	make build-model-functions

# 初期マイグレーションコマンド
.PHONY: init-migration
init-migration:
	# Supabaseを起動
	supabase start
	# 環境に応じてマイグレーションを実行
	if [ "${ENV}" == "local" ]; then \
		cd prisma && npx dotenv -e ../env/${ENV}.env -- prisma migrate dev --name initial-migration --skip-generate --skip-seed; \
		cd .. && make build-model-frontend-prisma; \
		make build-model-frontend-supabase; \
		cd prisma && npx dotenv -e ../env/local.env -- prisma db execute --file ./config/function.sql --schema schema.prisma; \
		npx dotenv -e ../env/local.env -- prisma db execute --file ./config/base.sql --schema schema.prisma; \
	else \
		cd prisma && npx dotenv -e ../env/${ENV}.env -- prisma migrate deploy --name initial-migration --create-only; \
	fi

.PHONY: migration
migration:
	supabase start
	if [ "${ENV}" == "local" ]; then \
		cd prisma && npx dotenv -e ../env/${ENV}.env -- prisma migrate dev --skip-generate --skip-seed;; \
		cd .. && make build-model-frontend-prisma; \
		cd prisma && npx dotenv -e ../env/${ENV}.env -- prisma db execute --file ./config/rls.sql --schema schema.prisma; \
		npx dotenv -e ../env/local.env -- prisma db execute --file ./config/function.sql --schema schema.prisma; \
		cd ..; \
		make build-model-frontend-supabase; \
	else \
		cd prisma && npx dotenv -e ../env/${ENV}.env -- prisma migrate deploy; \
	fi
