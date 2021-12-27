import * as React from 'react'
// useHistory は React のカスタムフックで history オブジェクトを返す
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
`

export const History: React.FC = () => {

  return (
    <>
    <HeaderArea>
      {/* ヘッダーコンポーネントを呼び出している箇所 */}
      <Header title= "履歴">
        <Link to="/editor">
        エディタに戻る
        </Link>
      </Header>
    </HeaderArea>
      <Wrapper>
        TODO:履歴表示
      </Wrapper>
    </>
  )
}