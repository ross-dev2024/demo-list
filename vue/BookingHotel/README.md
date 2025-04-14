# BookingHotel

ホテル予約システムのフロントエンドアプリケーション

## 概要

このプロジェクトは、Vue.js 3を使用して開発されたホテル予約システムのフロントエンドアプリケーションです。ユーザーはホテルの部屋を閲覧し、予約することができます。

## 技術スタック

- Vue.js 3
- Pinia (状態管理)
- Vue Router
- PrimeVue (UIコンポーネント)
- VeeValidate & Yup (フォームバリデーション)
- Axios (HTTP通信)

## 必要条件

- Node.js (v14以上)
- npm または yarn

## インストール

```bash
# 依存関係のインストール
npm install

# または
yarn install
```

## 開発サーバーの起動

```bash
# 開発サーバーを起動（ポート8082）
npm run serve

# または
yarn serve
```

## ビルド

```bash
# プロダクションビルドの作成
npm run build

# または
yarn build
```

## プロジェクト構造

```
src/
├── assets/      # 静的ファイル（画像、スタイルなど）
├── components/  # 再利用可能なコンポーネント
├── dummyData/   # モックデータとAPI
├── plugins/     # Vueプラグイン
├── stores/      # Piniaストア
├── views/       # ページコンポーネント
├── App.vue      # ルートコンポーネント
├── main.js      # アプリケーションのエントリーポイント
└── constants.js # 定数
```

## 機能

- ホテル部屋の一覧表示
- 部屋の詳細情報の表示
- 予約フォーム
- 予約履歴の表示
- レスポンシブデザイン

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
