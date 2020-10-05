import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ReactBoostrap from './pages/react-bootstrap';
import MaterialUI from './pages/material-ui';
import AntDesign from './pages/ant-design';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/react-bootstrap'>
          <ReactBoostrap />
        </Route>
        <Route path='/material-ui'>
          <MaterialUI />
        </Route>
        <Route path='/ant-design'>
          <AntDesign />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
