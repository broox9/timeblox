import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components'
import { ThemeProvider } from 'pcln-design-system'
import App from './App'

injectGlobal`
  body::-webkit-scrollbar {
      width: 1em;
  }
  
  body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  
  body::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`

ReactDOM.render(<ThemeProvider><App /></ThemeProvider>, document.querySelector('#main'))
