import React from 'react';
import {Switch, Route} from 'react-router-dom'
import ShopPage from "./pages/shop/shop.component";
import './App.css';

import HomePage from "./pages/homepage/homepages.component";
import Header from "./components/header/header.componenr";

function App() {
  return (
    <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route  path='/shop' component={ShopPage} />
        </Switch>
    </div>
  );
}

export default App;
