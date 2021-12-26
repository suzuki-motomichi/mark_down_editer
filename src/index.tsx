import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components' // styled-components をインポート
import { createGlobalStyle } from 'styled-components'
import { Editor } from './pages/editor' // editor.tsxをインポートし、下で呼び出す(表示)

// スタイルをページ全体に適用
const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `
  
  const Main = (
    <>
      <GlobalStyle />
      <Editor />
    </>
  )
  
  render(Main, document.getElementById('app'))

render(Main, document.getElementById('app'))