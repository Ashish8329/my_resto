import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/user/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>hello</h1>
      <Menu />
    </>
  )
}

export default App
