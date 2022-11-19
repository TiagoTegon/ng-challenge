import React, { useState } from 'react'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom' 
import './App.scss'
import { Login, Register } from './components/login/'

export default function App() {

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}