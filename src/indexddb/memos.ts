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

// テキスト履歴をリストで取得する関数を定義,戻り値は配列なので[]つける
export const getMemos = (): Promise<MemoRecord[]> => {
  // 保存した日時の昇順（古い順）で取得
  return memos.orderBy('datetime')
  // reverse で並び順を逆にする（新しい順）
        .reverse()
  // 取得したデータを配列に変換
        .toArray()
}
