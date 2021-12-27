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

// スタイルをページ全体に適用
const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `

  const Main = (
    <>
      <GlobalStyle />
      <Router>
        <Route exact path="/editor">
          <Editor />
        </Route>
        <Route exact path="/history">
          <History/>
        </Route>
        <Redirect to="/editor" path="*" />
      </Router>
    </>
  )

  render(Main, document.getElementById('app'))

render(Main, document.getElementById('app'))