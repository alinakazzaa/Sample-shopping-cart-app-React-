import React from 'react'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import LogIn from './screens/LogIn'
import Register from './screens/Register'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory

class App extends React.Component {

  render() {

    return (
      <div>
        <Router history={history()}>
          <Switch>
            <Route exact path="/">
              <LogIn history={history}
              // nextPath={this.nextPath} 
              />
            </Route>
            <Route path="/register">
              <Register history={history}
              // nextPath={this.nextPath}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
