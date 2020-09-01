import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';

import HomePage from "./pages/homepage/homepages.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.componenr";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentUser: null
        }
    }
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            }
            else {
                this.setState({currentUser:userAuth});
            }
        });
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
