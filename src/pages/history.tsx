import * as React from 'react'
// useHistory は React のカスタムフックで history オブジェクトを返す
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import {
  getMemoPageCount,
  getMemos,
  MemoRecord,
} from '../indexddb/memos'

const { useState,useEffect } = React

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`

const Memo = styled.button`
display: block;
background-color: white;
border: 1px solid gray;
width: 100%;
padding: 1rem;
margin: 1rem 0;
text-align: left;
`

const Paging = styled.div`
bottom: 0;
height: 3rem;
left: 0;
line-height: 2rem;
padding: 0.5rem;
position: fixed;
right: 0;
text-align: center;
`

const PagingButton = styled.button`
background: none;
border: none;
display: inline-block;
height: 2rem;
padding: 0.5rem 1rem;

&:disabled {
  color: silver;
}
`

const MemoTitle = styled.div`
font-size: 1rem;
margin-bottom 0.5rem;
`

const MemoText = styled.div`
font-size: 0.85rem;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`
// テキストの状態を更新る関数をパラメータとして受け取るeditor.tsxにもある
interface Props {
  setText: (text: string) => void
}
export const History: React.FC<Props> = (props) => {
  const { setText } = props
  const [memos, setMemos] = useState<MemoRecord[]>([])
  // ページングに関する状態を保持
  const [page, setPage] = useState(1)
  // 現在のページと最大ページ数を管理
  const [maxPage, setMaxPage] = useState(1)
  const history = useHistory()

  useEffect(() => {
    getMemos(1).then(setMemos)
    getMemoPageCount().then(setMaxPage)
  },[])

  const canNextPage: boolean = page < maxPage
  const canPrevPage: boolean = page > 1
  const movePage = (targetPage: number) => {
    // 遷移先のページが遷移可能か判断、不可なら処理を中断
    if (targetPage < 1 || maxPage < targetPage) {
    return
  }
  // 可能なら管理されているpageを更新
  setPage(targetPage)
  // 新しいpageのmemosを取得し更新
  getMemos(targetPage).then(setMemos)
  }

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
      {memos.map(memo => (
        // メモをクリックした時の処理
        <Memo
        key={memo.datetime}
        onClick={() => {
          setText(memo.text)
          history.push('/editor')
        }}>
          <MemoTitle>{memo.title}</MemoTitle>
          <MemoText>{memo.text}</MemoText>
        </Memo>
      ))}
      </Wrapper>
      <Paging>
        <PagingButton
        onClick={() => movePage(page - 1)}
        disabled={!canPrevPage}
        >
        ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
        onClick={() => movePage(page + 1)}
        disabled={!canNextPage}
        >
        ＞
        </PagingButton>
      </Paging>
    </>
  )
}