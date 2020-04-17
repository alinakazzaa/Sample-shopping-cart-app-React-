import React from 'react'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import LogIn from './screens/LogIn'
import Register from './screens/Register'
import { createBrowserHistory } from 'history'
import ItemCatalog from './screens/ItemCatalog'
const history = createBrowserHistory

class App extends React.Component {

  render() {

    return (
      <div>
        <Router history={history()}>
          <Switch>
            <Route exact path="/" component={LogIn}>
              <LogIn history={history} />
            </Route>
            <Route path="/register">
              <Register history={history} component={Register} />
            </Route>
            <Route path="/catalog">
              <ItemCatalog history={history} component={ItemCatalog} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
