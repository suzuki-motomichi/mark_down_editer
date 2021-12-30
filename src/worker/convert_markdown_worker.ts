// ライブラリのインポート
import * as marked from 'marked'
// sanitize-html をインポート
import * as sanitizeHtml from 'sanitize-html'

// 変数作成、これはTSの書き方でjsならselfにアクセス出来るがtsは型の兼ね合いがある為anyにしてチェックを回避する
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
  const text = event.data
  // ...はスプレッド構文で、元のオブジェクトを変更せず、新しい要素を追加する時(今回はh1とh2)などで使える
  const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2']})
  // メインスレッドからテキストデータをmarkedでHTMLに変換
  worker.postMessage({ html })
})
