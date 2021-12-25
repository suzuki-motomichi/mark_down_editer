import * as React from 'react'
import styled from 'styled-components'
// useState 関数を React から取り出す
const { useState } = React

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
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
// Editor という変数は React.FC という型(Function Componentの略)
export const Editor: React.FC = () => {
  // 上に書いたuseStateを使い、以下の１行で状態を管理する処理
  const [text, setText] = useState<string>('')
  return (
    // 描画されないタグ( <React.Fragment> の略 )
    <>
      <Header>
        Markdown Editor
      </Header>
      <Wrapper>
        {/* 以下TextAreaの各属性の状態に関する処理 */}
        <TextArea
        // onChangeでテキストの内容が変更された時に実行される関数を渡す、eventという値が引数となる
          onChange= {(event) => {
            // event.target.value にテキストの内容が格納される
            // 50行目のsetTextに引数として渡すことで、状態を更新
            setText(event.target.value)
          }}
          // TextArea の value という属性に50行目のuseStateで管理してる変数textにテキストの内容を渡す
          value={text}
          />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  )
}