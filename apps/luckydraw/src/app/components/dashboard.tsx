import axios from "axios";
import React, { Component } from "react";
import { CardColumns, Container, Nav, Navbar, Row, Toast } from "react-bootstrap";
import { Event } from "./event";
import { Participation } from "./participation";

export class Dashboard extends Component {
    constructor(props: {} | Readonly<{}> | any) {

        super(props);
        if (!this.props.location.state.data) {
            location.href = "/"
        }
        const {name, email, _id} = this.props.location.state.data;
        this.state = {
            name,
            email,
            _id,
            participations: null,
            raffles: null,
            events: null,
            toast: false,
            ticket: "0"
        };
        this.requestRaffle = this.requestRaffle.bind(this)
    }
    componentDidMount() {
        this.state = this.props.location.state.data;
        console.log(this.props.location.state.data);
        this.getParticipations();
        this.getRaffleTickets();
        this.getUpcomingEvents();
    }
    async getParticipations() {
        const url = 'http://localhost:3333/api/data/participations';
        // const email = this.state.email;
        console.log(this.state);

        const { data } = await axios.post(url, {
            customerId: this.state._id
        });
        this.setState({
            participations: data
        })
        console.log(data);
    }
    async getUpcomingEvents() {
        const url = 'http://localhost:3333/api/data/events/upcoming';
        // const email = this.state.email;
        // console.log(this.state);

        const { data } = await axios.post(url, {
            customerId: this.state._id
        });
        if (data.length > 0) {
            this.setState({
                events: data
            })
        }

    }
    async getRaffleTickets() {
        const url = 'http://localhost:3333/api/raffleticket/unused';
        const { data } = await axios.post(url, {
            customerId: this.state._id
        });
        this.setState({
            raffles: data
        });
        console.log(data)
    }

    handleParticipation(eventId, raffleId) {
        const raffle = this.state.raffles.find(item => item._id === raffleId)
        const event = this.state.events.find(item => item._id === eventId);
        const participations = [ ...this.state.participations, {event, raffle, customer: this.state._id}];
        const raffles = this.state.raffles.filter(item => item._id !== raffleId);
        const events = this.state.events.filter(item => item._id !== event._id);
        this.setState({
            participations,
            raffles,
            events
        })
    }

    async requestRaffle() {
        const url = 'http://localhost:3333/api/raffleticket/create';
        try {
            const { data } = await axios.post(url, {
                customerId: this.state._id
            });
            const raffles = [...this.state.raffles, data];
            this.setState({ raffles, toast: true, ticket: parseInt(data.name).toString(36).toUpperCase() });
            setTimeout(() => {
                this.setState({toast: false});
            }, 2000)
            console.log(data)
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Welcome, {this.state.name}!</Navbar.Brand>
                    <Nav className="mr-right">
                        <Nav.Link onClick={this.requestRaffle}>Request Raffle Ticket</Nav.Link>
                    </Nav>
                </Navbar>
                <Container>
               {this.state.toast && (<Toast className="d-fixed">
                    <Toast.Body>Ticket {this.state.ticket} created...</Toast.Body>
                </Toast>)}
                    <h2 className="my-4">Your Participations</h2>
                    {!this.state.participations && <p>Looks like you have not participated in any event yet!</p>}
                    <CardColumns>
                        {this.state.participations && this.state.participations.map((participation, idx) => {
                            return <Participation key={idx} event={participation.event} raffle={participation.raffle} winner={participation.event.winner === participation.customer}/>
                        })}
                    </CardColumns>
                    <hr />
                    <h2 className="my-4">Upcoming events</h2>
                    {!this.state.events && <p>Sorry, there are no events as of now. Please check this space in sometime.</p>}
                    <CardColumns>
                        {this.state.events && this.state.events.map((event, idx) => {
                            return <Event participation={this.handleParticipation.bind(this)} key={event._id} event={event} raffles={this.state.raffles} customer={this.state._id} />
                        })}
                    </CardColumns>
                </Container>

            </>
        )
    }
}