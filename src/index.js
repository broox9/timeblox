import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'pcln-design-system'
import App from './App'

ReactDOM.render(<ThemeProvider><App /></ThemeProvider>, document.querySelector('#main'))
