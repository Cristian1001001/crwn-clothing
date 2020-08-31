import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';

import HomePage from "./pages/homepage/homepages.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.componenr";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {auth} from "./firebase/firebase.utils";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentUser: null
        }
    }
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
            this.setState({currentUser: user});
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {


        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
