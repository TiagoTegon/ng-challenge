import React, { useState } from 'react'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom' 
import './App.scss'
import { Login, Register } from './components/login/'

export default function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className='App'>
        <Switch>
          <Route path='/'>
            <Login/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
        </Switch>
      </div>
    </Router>

  )
}