# タスク一覧

## 確定要件

### 閲覧機能

- カテゴリ一覧 → メニュー一覧 → レシピ詳細
- お気に入り（localStorage、端末ごとに保存）
- 検索（メニュー名・材料名）
- 材料の人数スケール（レシピ詳細で人数を変えると分量を自動計算）

### 管理機能

- メニューの追加・編集・削除
- カテゴリの追加・編集・削除
- 並び順変更（優先度低）

### 非機能要件

- URLを知っていれば誰でも閲覧可能
- 全員同じ内容（menus.json をサーバー側で一元管理）
- サーバー・DB不要（GitHub Pages + menus.json）
- 管理者は自分のみ（GitHub PAT で認証）

---

## 実装タスク

### 完了

- [x] category.html の二重フェッチ解消
- [x] category.html / recipe.html の localStorage（customMenus）依存を除去
- [x] category.html のメニューカードを innerHTML → textContent に変更（XSS対策）
- [x] index.html から GitHub Issues 経由のメニュー追加ボタンを削除
- [x] admin.html 作成（メニューCRUD・GitHub PAT認証・カテゴリフィルター）

### インフラ

- [x] GitHub Pages へのデプロイ設定

### 管理機能タスク

- [x] admin.html にカテゴリの追加・編集・削除を追加

### 閲覧機能タスク

- [x] お気に入り機能（localStorage、ハートアイコン・一覧表示）
- [x] 検索機能（メニュー名・材料名）
- [x] 材料の人数スケール（レシピ詳細ページ）

### 優先度低

- [ ] メニュー・カテゴリの並び順変更（admin.html）
- [ ] 不要になった config.js の整理
- [ ] .github/actions の整理（Issue経由フローの廃止）
