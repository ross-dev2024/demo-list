# フォトギャラリーアプリケーション

美しいUIで写真を管理できるシンプルなWebアプリケーションです。

## 機能

- 写真の一覧表示
- 写真の追加・編集・削除
- キーワードによる写真検索
- レスポンシブデザイン対応

## 技術スタック

- フロントエンド
  - Vue.js 3
  - Bootstrap 5
  - Font Awesome
- バックエンド
  - json-server（APIモック）

## 必要要件

- Node.js 14.0.0以上
- npm 6.0.0以上

## インストール

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run serve

# APIサーバーの起動（別ターミナルで実行）
npm run api 
```

## 使い方

1. ホーム画面
   - 登録された写真の一覧を表示
   - 写真カードにマウスを合わせると編集・削除ボタンが表示

2. 写真追加 
   - 「Add Photo」ボタンから新規写真を追加
   - タイトル、説明、撮影日時、写真ファイルを設定

3. 写真検索
   - 「Search Photos」から写真をキーワード検索
   - タイトルに含まれる文字列で検索可能

4. 写真編集・削除
   - 各写真の右上に表示される編集・削除ボタンから操作
   - 削除時は確認ダイアログを表示

## 開発者向け情報

### プロジェクト構成

```
src/
  ├── components/     # コンポーネント
  │   ├── HomePage.vue
  │   ├── PhotoFormPage.vue
  │   ├── SearchPage.vue
  │   └── NavBar.vue
  ├── App.vue        # ルートコンポーネント
  ├── main.js        # エントリーポイント
  └── constant.js    # 定数定義
```

### ビルド

```bash
# プロダクションビルド
npm run build

# コードチェック
npm run lint
```

## ライセンス

MIT License

## 作者

[Your Name]