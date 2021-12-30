// キャッシュ名を定義(リセットしたい時は名前を変えると新しい状態になる)
const CacheName = 'Cache:v1'

// self はサービスワーカー自身を指し,addEventListenerで各イベントにコールバックを登録
self.addEventListener('install', (event) => {
  console.log('ServiceWorker install:', event)
})

self.addEventListener('active', (event) => {
  console.log('ServiseWorker activate:', event)
})

const networkFallingBackToCache = async(request) => {
  // 定義した名前でキャッシュをopenする
  const cache = await caches.open(CacheName)
  try{
  // fetchリクエストを実行してレスポンスを取得
  const cache = await fetch(request)
  // レスポンスの中で一度しか読み取り出来ない処理があるため内容をコピーしてキャッシュに保存している
  await cache.put(request, response.clone())
  // レスポンスを呼び出し元に返却
  return response
  // リクエスト時にエラーが出たら
  } catch(err) {
  // コンソールにエラーを表示
  console.error(err)
  // キャッシュの内容を返却
  return cache.match(request)
  }
}

// fetch イベント時に実行する処理を登録(fetch はネットワークなどを経由してリソースを取得するために使用するAPI)
self.addEventListener('fetch', (event) => {
  // ネットワークリクエストを行なって結果をメインスレッドに戻す、respoundWithは非同期処理(promise)の終了まで待機するメソッド
  event.respondWith(networkFallingBackToCache(event.request))
  // networkFallingBackToCache(event.request) は作成した関数にリクエストを渡す
  // event.requestにメインスレッドからのリクエスト内容を返却
})