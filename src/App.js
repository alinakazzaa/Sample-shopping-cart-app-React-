import React from 'react'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import LogIn from './screens/LogIn'
import Register from './screens/Register'
import { createBrowserHistory } from 'history'
import ViewItem from './screens/ViewItem'
import AddItem from './screens/admin/AddItem'
import BasketView from './screens/customer/BasketView'
import OrderView from './screens/customer/OrderView'
import AdminScreen from './screens/main/AdminScreen'
import CustomerScreen from './screens/main/CustomerScreen'
import ItemCatalog from './screens/ItemCatalog'



const history = createBrowserHistory

class App extends React.Component {

  render() {

    return (
      <div>
        <Router history={history()}>
          <Switch>
            <Route exact path="/" render={props => <LogIn history={history} match={props.match} />} />
            <Route path="/register" render={props => <Register history={history} match={props.match} />} />
            <Route exact path="/admin" render={props => <AdminScreen history={history} match={props.match} />} />
            <Route exact path="/customer" render={props => <CustomerScreen history={history} match={props.match} />} />
            <Route exact path="/admin/addItem" render={props => <AddItem history={history} match={props.match} />} />
            <Route exact path="/:userType/viewItem/:id" render={props => <ItemCatalog history={history} match={props.match} />} />
            <Route exact path="/customer/basket" render={props => <BasketView history={history} match={props.match} />} />
            <Route exact path="/customer/order" render={props => <OrderView history={history} match={props.match} />} />
          </Switch>
        </Router>
      </div >
    )
  }
}

export default App
