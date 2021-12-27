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

const { useState } = React

const Header = styled.header`
  align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HeaderControl = styled.div`
height: 2rem;
display: flex;
align-content: center;
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
// localStorage でデータの参照・保存に使うキー名を決める,'ファイルパス:値の名前'
const StorageKey = 'pages/editor:text'
// Editor という変数は React.FC という型(Function Componentの略)
export const Editor: React.FC = () => {
  // 上に書いたuseStateを使い、以下の１行で状態を管理する処理
  const [text, setText] = useStateWithStorage('',StorageKey)
// 初期状態ではモーダルを出さないので、デフォルト値は false
  const [showModal, setShowModal] = useState(false)


  return (
    // 描画されないタグ( <React.Fragment> の略 )
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
          {/* ボタンを押した場合にモーダル表示のフラグをONにする */}
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </HeaderControl>
      </Header>
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