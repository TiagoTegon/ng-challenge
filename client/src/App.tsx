import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom' 
import './App.scss'
import { Login, Register } from './components/login/'
import { Profile } from './components/profile'

export default function App() {

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Redirect to="/login" />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}