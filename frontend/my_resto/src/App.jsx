import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import User from './components/user/User'
import UserLanding from './components/user/UserLanding'
import ChefIndex from './components/staff/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/menu' element={<User />} />
        <Route path='/scan/:qrToken' element={<UserLanding />} />
        <Route path='/staff/chef' element={<ChefIndex />} />
      </Routes>
    </>
  )
}

export default App
