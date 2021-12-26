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