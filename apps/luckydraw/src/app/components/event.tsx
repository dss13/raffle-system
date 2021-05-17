import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";

export class Event extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRaffleSelection = this.handleRaffleSelection.bind(this);
        this.participate = this.participate.bind(this);
        this.state = {
            showModal: false,
            raffles: this.props.raffles,
            selectedRaffle: null,
            error: false,
            errorMessage: ""
        }
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleRaffleSelection(event) {
        this.setState({
            selectedRaffle: event.target.value
        })
    }

    async participate() {
        const url = 'http://localhost:3333/api/participant/create';
        console.log({
            eventId: this.props.event._id,
            customerId: this.props.customer,
            raffleId: this.state.selectedRaffle
        })
        try {
            const { data } = await axios.post(url, {
                eventId: this.props.event._id,
                customerId: this.props.customer,
                raffleId: this.state.selectedRaffle
            })
            this.props.participation(this.props.event._id, this.state.selectedRaffle);
            this.setState({
                showModal: false
            })

        } catch(error) {
            this.setState({
                errorMessage: error.toString()
            })
        }

    }

    render() {
        return (
            <>
            <Col className="mb-5">
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.event.name}</Card.Title>
                        <Card.Text>
                            Reward: {this.props.event.reward}
                        </Card.Text>
                        {this.state.raffles && <Button onClick={this.toggleModal}>Participate</Button>}
                        {!this.state.raffles && <p>You don't have a raffle ticket to participate. Please place an order to receive a raffle ticket.</p>}
                    </Card.Body>
                    <Card.Footer>
                        <small>Ends on <b>{new Date(this.props.event.endsAt).toDateString()}</b></small>
                    </Card.Footer>
                </Card>
            </Col>
            <Modal show={this.state.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.toggleModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Participate in {this.props.event.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group onChange={this.handleRaffleSelection} controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select raffle ticket to participate:</Form.Label>
                            <Form.Control as="select">
                                {this.state.raffles && this.state.raffles.map((raffle, idx) => {
                                    return <option value={raffle._id} key={idx}>{parseInt(raffle.name).toString(36).toUpperCase()}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <p>{this.state.errorMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.participate}>Participate</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}