import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class InfoPage extends Component {
  render() {
    return (
      <Container className="p-4">
        <h1 className="gradient-2">Bus Monitor Project</h1>
        <Row className="justify-content-center p-5">
          <Col lg={6}>
            <h2 className="text-embers-4">Introdution</h2>
            <p>This project using IoT technology with <strong>UHF RFID ZK201</strong> to collect data from sensor, then send data through HTTP protocol to <strong>Firebase</strong> to save data realtime, user interface using <b> Reactjs </b> to implement on website.</p>
          </Col>
        </Row>
        <Row className="justify-content-center p-5">
          <Col lg={6}>
            <h2 className="text-embers-2">Features</h2>
            <p>User can sign up for an account to sign in the system and get information on bus at specific location and time for monitoring.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default InfoPage;
