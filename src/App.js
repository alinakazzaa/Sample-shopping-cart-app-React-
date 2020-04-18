import React from 'react'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import LogIn from './screens/LogIn'
import Register from './screens/Register'
import { createBrowserHistory } from 'history'
import ItemCatalog from './screens/ItemCatalog'
import ViewItem from './screens/ViewItem'
import AddItem from './screens/AddItem'
const history = createBrowserHistory

class App extends React.Component {

  render() {

    return (
      <div>
        <Router history={history()}>
          <Switch>
            <Route exact path="/" render={props => <LogIn history={history} match={props.match} />} />
            <Route path="/register" render={props => <Register history={history} match={props.match} />} />
            <Route path="/catalog" render={props => <ItemCatalog history={history} match={props.match} />} />
            <Route path="/addItem" render={props => <AddItem history={history} match={props.match} />} />
            <Route path="/viewItem/:id" render={props => <ViewItem history={history} match={props.match} />} />
          </Switch>
        </Router>
      </div >
    )
  }
}

export default App
