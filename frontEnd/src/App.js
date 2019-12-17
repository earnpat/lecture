import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import ContactUs from './pages/ContactUs'
import Upload from './pages/Upload'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/contactus' component={ContactUs}/>
        <Route exact path='/upload' component={Upload}/>
        <Redirect to='/home' />
      </Switch>
    </div>
  );
}

export default App;