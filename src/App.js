import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux';


import HomePage from "./pages/homepage/homepages.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.componenr";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data()
                    });
                });
            }
            else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {


        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signIn' render={()=> this.props.currentUser ? (<Redirect to=''/>) : (<SignInAndSignUpPage/>) }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

