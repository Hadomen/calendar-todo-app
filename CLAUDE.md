# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 役割
WebアプリケーションのTODOアプリ開発プロジェクト。
カレンダーと連携したTODO管理アプリをJava（バックエンド）とTypeScript（フロントエンド）で構築する。

## 目標
カレンダーUIと統合したTODOアプリの作成。タスクに日付・期限を設定し、カレンダー上で可視化できること。

## 技術スタック

### バックエンド
- **言語**: Java 21
- **フレームワーク**: Spring Boot 3.5
- **ビルドツール**: Gradle
- **テスト**: JUnit 5
- **DB**: PostgreSQL
- **DBアクセス**: DOMA 2（doma-spring-boot-starter:1.7.0）

### フロントエンド
- **言語**: TypeScript
- **フレームワーク**: React + Vite
- **カレンダー**: FullCalendar（React版）

## リポジトリ構成（モノレポ想定）
```
/
├── backend/    # Spring Boot プロジェクト
└── frontend/   # React + Vite プロジェクト
```

## 主要コマンド

### バックエンド
```bash
# ビルド
./gradlew build

# テスト実行
./gradlew test

# 単一テストクラス実行
./gradlew test --tests "パッケージ名.クラス名"

# 開発サーバー起動
./gradlew bootRun
```

### フロントエンド
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check
```

## アーキテクチャ概要
- バックエンドはREST APIとして提供し、フロントエンドと分離したSPA構成
- DOMA 2でPostgreSQLにアクセスし、TODOタスクを永続化。SELECT は `META-INF/com/example/todo/dao/TodoDao/*.sql` に明示的SQLを記述し、INSERT/UPDATE/DELETE はDOMAが自動生成
- フロントエンドはFullCalendarでカレンダーUIを描画し、タスクをカレンダー上に表示
- バックエンドAPI（`:8080`）とフロントエンド開発サーバー（`:5173`）はCORSで連携

## DOMA 2 の注意点
- `doma-processor`（アノテーションプロセッサ）のバージョンは `doma-spring-boot-starter` が依存する `doma-core` のバージョンと**必ず一致**させること（現在は両方 `2.53.1`）。不一致だと起動時に `DOMA0003` エラーが発生する
- エンティティのフィールドはパッケージプライベート（アクセス修飾子なし）にすること。DOMAの生成メタクラス（`_Todo`）が同パッケージから直接アクセスする
- `DaoConfig.java` で `new TodoDaoImpl(config)` を Spring Bean として登録する。`TodoDaoImpl` はコンパイル時にアノテーションプロセッサが生成する
- DBスキーマは `schema.sql`（`CREATE TABLE IF NOT EXISTS`）で管理し、`spring.sql.init.mode=always` で毎起動時に冪等実行する

## 制約
- 日本語で回答してください。
