import Dexie from 'dexie'

export interface MemoRecord {
  // IndexedDBに保存するデータの型を定義(TypeScript用)
  datetime: string
  title: string
  text: string
}
// Dexieのインスタンスの生成
const database = new Dexie('markdown-editor')
// データベースのバージョンが1, .storesで使用するテーブル&インデックスとなるデータ名を指定
database.version(1).stores({ memos: '&datetime' })
// データを扱うテーブルクラスを取得
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')
// 非同期処理,asyncを書いたらawaitで戻り値を受け取れる
export const putMemo = async (title: string, text: string): Promise<void> => {
  // ISOというフォーマットで出力(ISO 8601 は国際規格の日付と時刻の表記)
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text})
}

// １ページあたりnumber型で10件
const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async(): Promise<number> => {
  // memosテーブルからDexieに定義されたcount()関数を使って総件数を取得
  const totalCount = await memos.count()
  // トータル件数から1ページあたりの件数で割ってページ数を算出
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  // 0件でも１ページと判定する
  return pageCount > 0 ? pageCount: 1
}

// テキスト履歴をリストで取得する関数を定義,戻り値は配列なので[]つける
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  // page数をもとに最初に位置を算出
  const offset = (page - 1) * NUM_PER_PAGE
  // 保存した日時の昇順（古い順）で取得
  return memos.orderBy('datetime')
  // reverse で並び順を逆にする（新しい順）、更にoffsetとlimitを追加
        .reverse()
        // 取得するリストの開始位置の設定
        .offset(offset) // .offset(30)なら30件目以降を取得
        .limit(NUM_PER_PAGE) // 取得する件数
        .toArray() // 取得したデータを配列に変換

}
