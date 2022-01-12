import React, {Component} from 'react';

import SignOutLink from '../SignOut';
import {AuthUserContext} from '../Session';
import * as ROUTES from '../../constants/routes';
import * as BUS_CONFIG from '../../constants/mac';
import {Navbar, Nav, NavLink, NavItem, Dropdown, Container, Col, Row} from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      station : Object.keys(BUS_CONFIG.MAC)
    }

    this.onBusSelect = this.onBusSelect.bind(this);
  }

  onBusSelect(eventKey, event){
    // register chosen bus
    cookies.set('bus', eventKey, { path: '/'});
  }

  render() {
    return(
      <AuthUserContext.Consumer>
        {state => state.username ? <NavigationAuth username={state.username} onBusSelect={this.onBusSelect} bus={state.bus} station={this.state.station}/> : <NavigationNonAuth />}
      </AuthUserContext.Consumer>
    );
  }

}


class NavigationAuth extends Component {
  render() {
    return (
      <Container fluid="lg">
       <Row className="m-4">
          <Col lg={2} className="d-flex align-items-center">
            <a href={ROUTES.HOME} className="text-embers-4 fs-2 fw-bold">Bus Monitor</a>
          </Col>
          <Col lg={1} className="ms-auto d-flex align-items-center">
            <Dropdown onSelect={this.props.onBusSelect}>
              <Dropdown.Toggle >{this.props.bus}</Dropdown.Toggle>
              <Dropdown.Menu>
                {this.props.station.map((station, index) => (
                  <Dropdown.Item key={index} href={ROUTES.HOME}>{station}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col lg={1} className="d-flex align-items-center justify-content-center">
            <a href={ROUTES.INFO}>Info</a>
          </Col>
          <Col lg={1} className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle>{this.props.username}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={ROUTES.ACCOUNT} className="text-center">Account</Dropdown.Item>
                <Dropdown.Item><SignOutLink /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }

}

const NavigationNonAuth = () =>
  <Container fluid="lg">
    <Row className="m-4">
      <Col lg={2} className="d-flex align-items-center">
        <a href={ROUTES.HOME} className="text-embers-4 fs-2 fw-bold">Bus Monitor</a>
      </Col>
      <Col lg={1} className="ms-auto d-flex align-items-center">
        <a href={ROUTES.INFO}>Info</a>
      </Col>
      <Col lg={1} className="d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">Account</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={ROUTES.SIGN_IN} className="text-embers-4">Sign In</Dropdown.Item>
            <Dropdown.Item href={ROUTES.SIGN_UP} className="text-embers-4">Sign Up</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
    <hr />
  </Container>

export default Navigation;
