import React, { Component } from "react";

import { Route, Link } from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            email: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentWillMount() {
        // this.getData();
        console.log(`I;'m mounted`)
    }
    handleInput(event: any) {
        event.preventDefault();
        // this.setState({ email: event.target.value });
        console.log(event.target.value)
        this.setState((prev, props) => {
            email: event.target.value
        })
    }
    async getData() {
        const url = 'http://localhost:3333/api/customer/exists';
        // const email = this.state.email;
        console.log(this.state);
        return;

        const data = await axios.post(url, this.state);
        console.log(data);
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInput} />
                <button onClick={this.getData}>Login</button>
              {/* <Link to="/dashboard">
                <button>Login</button>
              </Link> */}
                <Route
                    path="/"
                    exact
                    render={() => (
                        <div>
                        This is the generated root route.{' '}
                        <Link to="/page-2">Click here for page 2.</Link>
                        </div>
                    )}
                    />
                    <Route
                    path="/dashboard"
                    exact
                    render={() => (
                        <div>
                            <Link to="/">Click here to go back to root page.</Link>
                        </div>
                    )}
                />
            </div>


        );
    }
}

export default Login;