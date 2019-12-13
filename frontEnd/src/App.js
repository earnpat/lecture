import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Redirect to='/home' />
      </Switch>
    </div>
  );
}

export default App;