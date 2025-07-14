# 習慣でキャラ成長アプリ

日々の習慣を記録しながらキャラクターを育てていく、習慣トラッカー＆育成アプリです。  
習慣を達成すると経験値が加算され、レベルが上がるとキャラクター画像が変化します！

---

## 主な機能

-  習慣の追加・編集・削除
-  習慣の達成チェック（チェックボックス）
-  過去1週間・1ヶ月の習慣達成率を棒グラフで可視化
-  レベルアップ時にキャラ画像が変化＋アニメーション
-  ローカルストレージで習慣と成長状態を永続保存
-  Tailwind CSSによる直感的なインターフェース
-  セキュリティ強化（バリデーション・サニタイズ・CRLF対策など）

---

## 使用技術

| 技術 | 内容 |
|------|------|
| **React + Vite** | 高速なモダン開発フレームワーク |
| **Zustand** | 軽量な状態管理ライブラリ |
| **Chart.js + react-chartjs-2** | 棒グラフ描画（達成率の可視化） |
| **Framer Motion** | キャラレベルアップ時のアニメーション |
| **Tailwind CSS** | スタイリングフレームワーク |
| **LocalStorage** | ユーザーデータの保存 |
| **Node.js / npm** | 環境構築と依存管理 |

---

## セットアップ手順

### ✅ 必要環境

- Node.js v18以上
- npm または yarn(npm推奨)

### インストールと起動

```bash
git clone https://github.com/yourname/habit-growth-app.git
cd habit-growth-app
npm install
npm run dev

##  Tailwind CSS を VSCode で快適に使うための設定

Tailwind CSS を使っていると、VSCode 上で `Unknown at rule @tailwind` という警告が出ることがあります。これは CSS 標準に含まれない Tailwind の独自構文が原因です。

以下の手順を踏めば、警告を抑止しつつ補完機能も有効化できます。

###  `.vscode/settings.json` の推奨設定

```jsonc
{
  "files.associations": {
    "*.css": "tailwindcss",
    "*.html": "html"
  },
  "editor.quickSuggestions": {
    "strings": true
  },
  "css.lint.unknownAtRules": "ignore"
}



### セキュリティ強化ポイント
- 習慣名のバリデーション（空文字・長すぎる文字列などを拒否）
- 入力のサニタイズ処理（スクリプト埋め込み防止）
- CRLF（改行）対策（無効な文字列や改行の正規化）
- ローカルストレージの暗号化（未実装)  
-Rate Limiting / HTTPS

## 今後の展望
- 習慣データのオンライン同期(Firebase/supabase)
- マルチユーザー対応
- キャラクターカスタマイズ(スキン変更・アイテム実装)
- アチーブメントの実装

# 開発者
作成者:せぱた
GitHub:riririops