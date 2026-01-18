import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'

import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  // Initialize token from localStorage only once
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')

  // Update or remove token in localStorage whenever it changes
  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            <Sidebar />

            <div className="flex-1 max-w-[70%] mx-auto my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Add token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
