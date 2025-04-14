# Meal Planner

シンプルで使いやすい食事計画アプリケーション。1週間の食事を簡単に計画し、管理することができます。

## 機能

- **レシピ検索**: 豊富なレシピコレクションから簡単に検索
- **週間プランニング**: 1週間の食事プランを柔軟に作成
- **複数レシピ**: 各日に複数のレシピを追加可能
- **栄養情報**: 調理時間とカロリー情報を表示
- **編集機能**: レシピの追加、編集、削除が簡単
- **ダウンロード**: 作成した食事プランをダウンロード可能

## 使い方

1. **レシピの追加**
   - 各日の「Add Recipe」ボタンをクリック
   - レシピを検索または一覧から選択
   - 「Add」ボタンで追加

2. **レシピの編集**
   - レシピカードの編集アイコンをクリック
   - 新しいレシピを選択
   - 「Update」ボタンで更新

3. **レシピの削除**
   - レシピカードの削除アイコンをクリック

4. **プランのダウンロード**
   - 画面下部の「Download Meal Plan」ボタンをクリック

## 技術スタック

- Vue 3
- TypeScript
- Element Plus
- Pinia (状態管理)

## インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build
```

## 環境変数

必要な環境変数は以下の通りです：

```env
VITE_API_URL=your_api_url_here
```

## ライセンス

MIT License

## 作者

Created by: wangjw.dev

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## お問い合わせ

質問や提案がありましたら、Issueを作成してください。
