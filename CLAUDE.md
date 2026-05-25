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
- **DBアクセス**: Spring Data JPA

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
- Spring Data JPAでPostgreSQLにアクセスし、TODOタスクを永続化
- フロントエンドはFullCalendarでカレンダーUIを描画し、タスクをカレンダー上に表示
- バックエンドAPI（`:8080`）とフロントエンド開発サーバー（`:5173`）はCORSで連携

## 制約
- 日本語で回答してください。
