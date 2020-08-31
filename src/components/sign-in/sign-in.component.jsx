import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../cusrom-button/custom-button.component";

import './sign-in.style.scss';

import {signInWithGoogle} from "../../firebase/firebase.utils";

class SignIn extends React.Component{
    constructor() {
        super();
        this.state= {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render() {
        return(
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label="email"
                        required
                    />
                    <FormInput
                            name="password"
                            type="password"
                            value={this.state.password}
                            handleChange={this.handleChange}
                            label="password"
                            required

                    />
                    <CustomButton type='submit'> Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} >
                        {' '}
                        Sign in with Google{' '}
                    </CustomButton>
                </form>

            </div>
        );
    }
}

export default SignIn