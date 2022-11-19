import React, { useState } from 'react'
import logo from './logo.svg'
import './App.scss'
import { Login, Register } from './components/login';

export default function App() {

  return (
    <div className='App'>
        <Login/>
        <Register/>
    </div>
  )
}