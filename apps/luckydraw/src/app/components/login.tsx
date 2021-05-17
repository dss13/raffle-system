import React, { Component, useState } from "react";

import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { Alert, Button, Container, Row, Col, Card, Form } from 'react-bootstrap';

export class Login extends Component {
    error = false;
    constructor(props: {} | Readonly<any>) {
        super(props);
        this.state = {
            email: "",
            error: false,
            success: false,
            redirectToDashboard: false
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
        this.setState({
            email: event.target.value,
            error: false,
            success: false
        })
        console.log(this.state);
    }
    async getData() {
        const url = 'http://localhost:3333/api/customer/exists';
        // const email = this.state.email;
        console.log(this.state);

        const { data } = await axios.post(url, this.state);
        console.log(data);
        if (data.length === 0) {
            this.setState({
                error: true,
                success: false
            })
        } else {
            this.setState({
                error: false,
                success: true,
                redirectToDashboard: true,
                data: data[0]
            })
        }
        return null;
    }
    render() {
        return (
            <div className="display-center">
                <Container>
                    <Row>
                        <Col sm={0} md={2} lg={3}></Col>
                        <Col sm={12} md={8} lg={6}>
                            <Card>
                                <Card.Header>Customer login</Card.Header>
                                <Card.Body>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control onChange={this.handleInput} type="email" placeholder="name@example.com" />
                                    </Form.Group>

                                </Form>
                                <Button onClick={this.getData} variant="primary" type="submit" block>
                                    Login
                                </Button>
                                    {/* <div>
                                        <input type="text" onChange={this.handleInput} />
                                    </div>
                                    <div>
                                        <button onClick={this.getData}>Login</button>
                                    </div> */}

                                </Card.Body>
                            </Card>
                            <Alert show={this.state.error} variant="danger">
                                <Alert.Heading>Authentication failed!</Alert.Heading>
                                <p>
                                    Please check the credentials and try again.
                                </p>
                            </Alert>
                            <Alert show={this.state.success} variant="success">
                                <Alert.Heading>Log in successful</Alert.Heading>
                                <p>
                                    You will be redirected to dashboard shortly...
                                </p>
                            </Alert>
                        </Col>
                        <Col sm={0} md={2} lg={3}></Col>
                    </Row>
                </Container>
                {this.state.redirectToDashboard && (<Redirect to={{pathname: '/dashboard', state: {data: this.state.data }}}/>)}

            </div>


        );
    }
}

export default Login;