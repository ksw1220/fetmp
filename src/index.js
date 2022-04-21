import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import './Styles/index.css'
import theme from './Styles/Theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

