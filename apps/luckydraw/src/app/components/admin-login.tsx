import React, { Component } from "react";
import { Card, Form, Alert, Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export class AdminLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credential: "",
            error: false,
            redirectToDashboard: false,
            success: false
        }
        this.handleCredentials = this.handleCredentials.bind(this);
        this.checkCredentials = this.checkCredentials.bind(this);
    }

    handleCredentials(event) {
        this.setState({
            credential: event.target.value,
            error: false
        })
    }

    checkCredentials() {
        if (this.state.credential === 'admin') {
            this.setState({redirectToDashboard: true})
        } else {
            this.setState({error: true});
        }
    }

    render() {
        return (
            <div className="display-center">
                <Container>
                    <Row>
                        <Col sm={0} md={2} lg={3}></Col>
                        <Col sm={12} md={8} lg={6}>
                            <Card>
                                <Card.Header>Admin login</Card.Header>
                                <Card.Body>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control onChange={this.handleCredentials} type="text" />
                                    </Form.Group>

                                </Form>
                                <Button onClick={this.checkCredentials} variant="primary" type="submit" block>
                                    Login
                                </Button>

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
                {this.state.redirectToDashboard && (<Redirect to={{pathname: '/admin/dashboard', state: {data: this.state.data }}}/>)}

            </div>
        )
    }
}