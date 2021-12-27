import * as React from 'react'
// useHistory は React のカスタムフックで history オブジェクトを返す
import { useHistory } from 'react-router-dom'
import { Button } from '../components/button'

export const History: React.FC = () => {
  // useState のようにセット用の関数は戻り値に含まれず、history オブジェクトだけ返却される
  const history = useHistory()
  return (
    <>
    <h1>History</h1>
    {/* onClick に history.push('遷移したいパス') を実行する関数を渡している */}
    <Button onClick={() => history.push('/editor')}>
      エディタに戻る
    </Button>
    </>
  )
}