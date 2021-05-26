import React, {Component} from 'react';

import SignOutLink from '../SignOut';
import {AuthUserContext} from '../Session';
import * as ROUTES from '../../constants/routes';
import {Navbar, Nav, NavLink, NavItem, Dropdown, Container, Col, Row} from 'react-bootstrap';


const Navigation = () =>
  <div>
    <AuthUserContext.Consumer>
      {state => state.authUser ? <NavigationAuth {...state}/> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>;


class NavigationAuth extends Component {
  render() {
    return (
      <Container fluid="lg">
        <Navbar variant="light">
          <Navbar.Brand href={ROUTES.HOME} className="text-embers-4">
            <img src={process.env.PUBLIC_URL + '/logo.jpg'}
                className="d-inline-block logo"
                alt="Cat house logo"/>{' '}
            Smart Cat Home

          </Navbar.Brand>
          <Container>
            <Row className="justify-content-end">
              <Col lg={1}>
                <Nav.Link href={ROUTES.INFO}>Info</Nav.Link>
              </Col>
              <Col lg={2}>
                <Dropdown as={NavItem}>
                  <Dropdown.Toggle as={NavLink}>{this.props.username}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink href={ROUTES.ACCOUNT}>Account</NavLink>
                    <SignOutLink />
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <hr />
      </Container>
    );
  }

}

const NavigationNonAuth = () =>
  <Container fluid="lg">
    <Navbar variant="light">
      <Navbar.Brand href={ROUTES.HOME} className="text-embers-4">
        <img src={process.env.PUBLIC_URL + '/logo.jpg'}
            className="d-inline-block logo"
            alt="Cat house logo"/>{' '}
        Smart Cat Home
      </Navbar.Brand>
      <Container>
        <Row className="justify-content-end">
          <Col lg={1}>
            <Nav.Link href={ROUTES.INFO}>Info</Nav.Link>
          </Col>
          <Col lg={2}>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>Account</Dropdown.Toggle>
              <Dropdown.Menu>
                <NavLink href={ROUTES.SIGN_IN}>Sign In</NavLink>
                <NavLink href={ROUTES.SIGN_UP}>Sign Up</NavLink>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
    <hr />
  </Container>

export default Navigation;
