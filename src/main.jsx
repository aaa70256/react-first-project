import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  // ! StrictMode嚴格模式會進行雙調用

  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
