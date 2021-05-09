import React, {Component} from 'react';

import {withFirebase} from '../Firebase';

import {Container, Col, Row, Button} from 'react-bootstrap';
class ControlPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fan: 0,
      led: 0,
      pump: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick = (event) => {
    let ctrl = this.state[event.target.name];
    ctrl = ctrl ? 0 : 1;
    this.props.firebase.control_out().update({[event.target.name]: ctrl});
  }

  render() {
    const {fan, led, pump} = this.state;
    return(
      <Container>
        <Row className="justify-content-center">
          <Col lg={2} className="text-center">
            <Button className={fan ? "btn-embers-3" : "btn-embers-1"}
                    size="lg"
                    type="button"
                    name="fan"
                    block="true"
                    onClick={this.onClick}>
                Fan: {fan ? 'On': 'Off'}
            </Button>
          </Col>
          <Col lg={2} className="text-center">
            <Button className={led ? "btn-embers-3" : "btn-embers-1"}
                    size="lg"
                    type="button"
                    name="led"
                    block="true"
                    onClick={this.onClick}>
                Led: {led ? 'On': 'Off'}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center p-4">
          <Col lg={4} className="text-center">
            <Button className={pump ? "btn-embers-3" : "btn-embers-1"}
                    size="lg"
                    type="button"
                    name="pump"
                    block="true"
                    onClick={this.onClick}>
                Pump: {pump ? 'On': 'Off'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.props.firebase.control_out().on('value', snapshot => {
      const control = snapshot.val();
      this.setState({...control});
    })
  }

  componentWillUnmount() {
    this.props.firebase.control_out().off();
  }

}

export default withFirebase(ControlPage);
