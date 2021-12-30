import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/user_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
// ボタンコンポーネントとIndexedDB保存処理を組み込む
import { putMemo } from '../indexddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
// react-routerからLinkという要素をインポート
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
// Workerの読み込み、src/worker/test.ts の型定義と合わせる為にworker-loader!を記入
import TestWorker from 'worker-loader!../worker/test.ts'

const testWorker = new TestWorker()
// Worker インスタンスの生成
const { useState, useEffect } = React

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HeaderArea = styled.div`
position: fixed;
right: 0;
top: 0;
left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`
interface Props {
  text: string
  setText: (text: string) => void
}
// Editor という変数は React.FC という型(Function Componentの略)
export const Editor: React.FC<Props> = (props) => {
  // 呼び出し元からパラメータとして渡される
  const {text, setText} = props
// 初期状態ではモーダルを出さないので、デフォルト値は false
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
// userEffectを使って初回のみWorkerから結果を受け取る関数を登録
    testWorker.onmessage = (event) => {
      console.log('Main thread Received:', event.data)
    }
  },[])

  useEffect(() => {
// useEffectを使ってテキスト変更時にWorkerにデータを送信
    testWorker.postMessage(text)
  },[text])

  return (
    // 描画されないタグ( <React.Fragment> の略 )
    <>
      <HeaderArea>
        {/* ヘッダーコンポーネントを呼び出している箇所 */}
        <Header title= "Markdown Editor">
          {/* ボタンを押した場合にモーダル表示のフラグをONにする */}
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {/* 以下TextAreaの各属性の状態に関する処理 */}
        <TextArea
        // onChangeでテキストの内容が変更された時に実行される関数を渡す、eventという値が引数となる
          onChange= {(event) => setText(event.target.value)}
          // TextArea の value という属性に51行目のuseStateで管理してる変数textにテキストの内容を渡す
          value={text}
          />
        <Preview>
  <ReactMarkdown>{text}</ReactMarkdown>
        </Preview>
      </Wrapper>
      {/* showModalがtrueであれば&&以降の処理をする */}
      {showModal && (
        <SaveModal
        onSave={(title: string): void => {
          putMemo(title, text)
          setShowModal(false)
        }}
        // モーダルを閉じる
        onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}