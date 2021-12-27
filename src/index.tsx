import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components' // styled-components をインポート
import { createGlobalStyle } from 'styled-components'
import {
  // HashRouterをRouter使う
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor' // editor.tsxをインポートし、下で呼び出す(表示)
import { History } from './pages/history'
import { useStateWithStorage } from './hooks/user_state_with_storage'

// スタイルをページ全体に適用
const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `

  const StrageKey = '/editor:text'
  const Main: React.FC = () => {
    const [text, setText] = useStateWithStorage('',StrageKey)
    return(
    <>
      <GlobalStyle />
      <Router>
        <Switch>
        <Route exact path="/editor">
          <Editor
          text={text}
          setText={setText}
          />
        </Route>
        <Route exact path="/history">
          <History
          setText={setText}
          />
        </Route>
        <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
    </>
  )
}

render(<Main />, document.getElementById('app'))