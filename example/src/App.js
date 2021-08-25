import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/docs/:framework'>
          <Docs />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
