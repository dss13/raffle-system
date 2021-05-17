import axios from "axios";
import React, { Component } from "react";
import { Tab, Tabs, Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

export class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            event: "",
            reward: "",
            ends: null,
            errorMessage: null,
            success: false,
            error: false
        }
        this.createEvent = this.createEvent.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleEnds = this.handleEnds.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleReward = this.handleReward.bind(this);
    }

    async createUser() {
        const url = 'http://localhost:3333/api/customer/create'
        const payload = {
            name: this.state.name,
            email: this.state.email
        }
        try {
            const { data } = await axios.post(url, payload);
            this.setState({
                name: "",
                email: "",
                success: true,
                error: false
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.toString()
            })
        }

    }

    async createEvent() {
        const url = 'http://localhost:3333/api/event/create'
        const payload = {
            name: this.state.event,
            reward: this.state.reward,
            endsAt: new Date(this.state.ends).toISOString()
        }
        try {
            const { data } = await axios.post(url, payload);
            this.setState({
                name: "",
                email: "",
                success: true,
                error: false
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.toString()
            })
        }
    }

    handleName(event) {
        this.setState({
            name: event.target.value,
            success: false,
            error: false
        })
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value,
            success: false,
            error: false

        })
    }

    handleEvent(event) {
        this.setState({
            event: event.target.value,
            success: false,
            error: false
        })
    }

    handleReward(event) {
        this.setState({
            reward: event.target.value,
            success: false,
            error: false
        })
    }

    handleEnds(event) {
        this.setState({
            ends: event.target.value,
            success: false,
            error: false
        })
        console.log(event.target.value)
    }

    render() {
        return (
        <>
            <Container>
                <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
                    <Tab eventKey="user" title="Create user">
                    <Container>
                        <Row>
                            <Col sm={0} md={2} lg={3}></Col>
                            <Col sm={12} md={8} lg={6}>
                                <Card>
                                    <Card.Header>Admin login</Card.Header>
                                    <Card.Body>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control onChange={this.handleName} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control onChange={this.handleEmail} type="email" />
                                        </Form.Group>
                                    </Form>
                                    <Button onClick={this.createUser} variant="primary" type="submit" block>
                                        Create
                                    </Button>

                                    </Card.Body>
                                </Card>
                                <Alert show={this.state.error} variant="danger">
                                    <Alert.Heading>Something's wrong!</Alert.Heading>
                                    <p>
                                        {this.state.errorMessage}
                                    </p>
                                </Alert>
                                <Alert show={this.state.success} variant="success">
                                    <Alert.Heading>Yay!</Alert.Heading>
                                    <p>
                                        User successfully created
                                    </p>
                                </Alert>
                            </Col>
                            <Col sm={0} md={2} lg={3}></Col>
                        </Row>
                    </Container>
                    </Tab>
                    <Tab eventKey="event" title="Create event">
                    <Container>
                        <Row>
                            <Col sm={0} md={2} lg={3}></Col>
                            <Col sm={12} md={8} lg={6}>
                                <Card>
                                    <Card.Header>Admin login</Card.Header>
                                    <Card.Body>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Event name</Form.Label>
                                            <Form.Control onChange={this.handleEvent} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Reward</Form.Label>
                                            <Form.Control onChange={this.handleReward} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Ends on</Form.Label>
                                            <Form.Control onChange={this.handleEnds} type="date" />
                                        </Form.Group>

                                    </Form>
                                    <Button onClick={this.createEvent} variant="primary" type="submit" block>
                                        Create
                                    </Button>

                                    </Card.Body>
                                </Card>
                                <Alert show={this.state.error} variant="danger">
                                    <Alert.Heading>Something's wrong!</Alert.Heading>
                                    <p>
                                        {this.state.errorMessage}
                                    </p>
                                </Alert>
                                <Alert show={this.state.success} variant="success">
                                    <Alert.Heading>Yay!</Alert.Heading>
                                    <p>
                                        Event created successfully
                                    </p>
                                </Alert>
                            </Col>
                            <Col sm={0} md={2} lg={3}></Col>
                        </Row>
                    </Container>
                    </Tab>
                </Tabs>
            </Container>

        </>
        )
    }
}