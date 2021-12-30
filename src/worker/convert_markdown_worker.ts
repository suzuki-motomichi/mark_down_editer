// ライブラリのインポート
import * as marked from 'marked'

// 変数作成、これはTSの書き方でjsならselfにアクセス出来るがtsは型の兼ね合いがある為anyにしてチェックを回避する
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
const text = event.data
const html = marked(text)
// メインスレッドからテキストデータをmarkedでHTMLに変換
worker.postMessage({ html })
})
