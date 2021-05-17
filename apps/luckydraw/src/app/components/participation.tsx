import React, { Component } from "react";
import { Card, Col, Badge } from "react-bootstrap";

export class Participation extends Component {
    now = new Date();
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <Col className="mb-5">
                <Card border={this.props.winner && "success"}>
                    <Card.Body>
                        <Card.Title>{this.props.event.name} {this.props.winner && <Badge variant="success">Winner</Badge>}</Card.Title>
                        <Card.Text>
                            {this.props.winner && <>You won a <b>{this.props.event.reward}!</b></>}
                            {!this.props.winner && <>Reward: {this.props.event.reward}</>}
                            <br/>
                            Participated using {parseInt(this.props.raffle.name).toString(36).toUpperCase()}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small>{new Date(this.props.event.endsAt).getTime() > new Date().getTime() ? 'Ends' : 'Ended'} on <b>{new Date(this.props.event.endsAt).toDateString()}</b></small>
                    </Card.Footer>
                </Card>
            </Col>

        )
    }
}