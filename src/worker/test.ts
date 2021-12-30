// 変数作成、これはTSの書き方でjsならselfにアクセス出来るがtsは型の兼ね合いがある為anyにしてチェックを回避する
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
  // 引数のdataがパラメータでありメインスレッドから渡された値
  console.log('Worker Received:', event.data)

  // consoleでサクサク動くかテスト
  let count: number = 1
  while (count < 1_000_000_000) { //最初から大きな値を入れないでください
  count++
  }

  // postMessage関数を呼び出してメインスレッドへ処理結果を送信
  worker.postMessage({ result: event.data})
})
