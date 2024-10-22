import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import Home from './components/Home'
import {  useState } from 'react'
import { Toaster } from 'react-hot-toast'



function App() {
  const [userData, setUserData] = useState({})
  

  return (
    <>

      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth  userData={userData} setUserData={setUserData}/>}></Route>
          <Route path="/home" element={<Home userData={userData} setUserData={setUserData} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
