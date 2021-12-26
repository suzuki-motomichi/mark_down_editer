import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`

  interface Props {
    cancel?: boolean
    children: string
    onClick: () => void
  }

interface Props {
// children はボタン内に表示するテキスト
  children: string
// クリックした時の関数、void(空っぽ)にしてある
  onClick: () => void
}
//　出力、 変数Buttonにはボタンコンポーネント関数の定義、引数の props は Props であると型を明示
export const Button: React.FC<Props> = (props) => (
  // 4行目のスタイルを適用し、16行目にあるchildrenのテキストを表示
  <StyledButton onClick = {props.onClick} className={props.cancel ? `cancel` : ''}>
    {props.children}
  </StyledButton>
)