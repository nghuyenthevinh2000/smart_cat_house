import React from 'react';

import PasswordChangePage from '../PasswordChange';
import {AuthUserContext, withAuthorization} from '../Session';
import {ListGroup, Container, Row, Col} from 'react-bootstrap';

const AccountPage = () =>
  <AuthUserContext.Consumer>
  {state =>
    <Container>
      <h2 className='gradient-3'>Account Info</h2>
      <Row className="justify-content-center m-4">
        <Col lg={2} className="p-0">
          <ListGroup as="ul">
            <ListGroup.Item as="li" className="bg-embers-4 border-0" active>
              Username
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Email
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Uid
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" className="bg-embers-3 border-0" active>
              {state.username}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              {state.email}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              {state.authUser.uid}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="p-4" />
      <PasswordChangePage />
    </Container>
  }
  </AuthUserContext.Consumer>

const condition = authUser => authUser;

export default withAuthorization(condition)(AccountPage);
