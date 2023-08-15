import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './views/home'
import Header from '../header'
import Footer from '../footer'
import singleProduct from './views/single-product'
import Shopdetails from './views/shop-details'
import Productview from './views/product'
import NotFound from '../../NotFound'
import Login from './views/checkout/login'
import checkout from './views/checkout'
import PrivateRoute from '../PrivateRoute'
import Register from './views/checkout/register'
import Complete from './views/checkout/complete'
import Failed from './views/checkout/failed'
import Account from './views/account'

export default class rootRoutes extends Component {
  render() {
    return (
      <div>
        <Header/>
       <Switch>
        <Route exact path='/' component={Home} />                         
        <Route exact path='/p/:slug/:id' component={singleProduct} /> 
        <Route exact path='/shop/:slug' component={Shopdetails} />
        <Route path='/product/catalogsearch/result' component={Productview} /> 
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <PrivateRoute path='/checkout' component={checkout} /> 
        <PrivateRoute path='/order/success' component={Complete} /> 
         <PrivateRoute path='/order/failed' component={Failed} />  
         <PrivateRoute path='/account' component={Account} />                    

        <Route component={NotFound} />
      </Switch>
      <Footer/>
      </div>
    )
  }
}
