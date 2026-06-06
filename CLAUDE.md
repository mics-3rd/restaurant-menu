# restaurant-menu

みっくん食堂の料理レシピ閲覧サイト。バックエンド不要の静的Webアプリ。

## プロジェクト構成

```
restaurant-menu/
├── index.html          # トップ: カテゴリ一覧グリッド
├── category.html       # カテゴリ別メニュー一覧
├── recipe.html         # レシピ詳細（材料・作り方）
├── styles.css          # 全ページ共通スタイル
├── config.js           # 設定（現在は空）
├── data/
│   └── menus.json      # 全データ（カテゴリ・メニュー）
└── .github/
    ├── ISSUE_TEMPLATE/menu_add.md   # メニュー追加Issueテンプレート
    ├── actions/sync-menus.js        # Issue→JSON変換スクリプト
    └── workflows/menu-sync.yml      # GitHub Actions定義
```

## 画面遷移

```
index.html
  └─(カテゴリ選択)→ category.html?cat={id}
                        └─(メニュー選択)→ recipe.html?menu={id}&cat={id}
```

戻るボタンは常に一つ前の画面へ戻る（クエリパラメータで制御）。

## データ構造（data/menus.json）

```json
{
  "categories": [
    { "id": "meat", "name": "肉料理" }
  ],
  "menus": [
    {
      "id": "karaage",
      "name": "唐揚げ",
      "category": "meat",
      "description": "一言説明",
      "serving": "2人分",
      "ingredients": ["材料名 分量"],
      "recipe": ["手順1", "手順2"]
    }
  ]
}
```

### カテゴリID一覧
`meat` / `fish` / `noodles` / `side` / `soup` / `sweets` / `others`

### ingredientsの形式
文字列の場合、最初のスペースで「材料名」と「分量」に分割して表示する（`recipe.html`内で処理）。
オブジェクト形式 `{ "item": "材料名", "amount": "分量" }` も受け付ける。

## メニュー追加の仕組み

1. GitHubのIssueをテンプレート（`menu_add.md`）で作成
2. GitHub Actions（`menu-sync.yml`）が起動
3. `sync-menus.js` がIssue本文をパースして `menus.json` へ追記
4. `id` は `issue-{issue番号}` 形式で自動付与

手動で `menus.json` に直接追記する場合は `id` を英数字+ハイフンで一意に設定する。

## ローカル確認方法

静的ファイルのため、`fetch()` を使っているので直接ファイルを開くと CORS エラーになる。
ローカルサーバーを立てて確認すること。

```
npx serve .
# または
python -m http.server 8080
```

## スタイルガイド

- カラーパレット: 緑系（`#2d7a6b` メイン, `#1a3a34` テキスト, `#f0f5f0` 背景）
- レシピ詳細のセクションボックスは暖色系（`#fff6ed` 背景, `#e2ccb8` ボーダー）
- レスポンシブ: 2列（デフォルト）→ 3列（900px以上）→ 4列（1200px以上）
- JavaScriptはバニラJS、フレームワーク不使用

## 注意事項

- `noindex,nofollow` が全ページに設定されており、検索エンジンに公開しない想定
- `localStorage` に `customMenus` キーでカスタムメニューを保存する機能がある（`category.html` / `recipe.html` で読み込み）
- `config.js` の `DATA_API_URL` は現在未使用（Issue/Actions方式に移行済み）
