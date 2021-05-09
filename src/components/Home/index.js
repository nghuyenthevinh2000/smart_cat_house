import React from 'react';

import {withAuthorization} from '../Session';
import DataPage from '../Data';
import ControlPage from '../Control';
import {Container, Row} from 'react-bootstrap';

const HomePage = () =>
  <Container>
    <h1>Home Page</h1>
    <Row className="p-4">
      <h2 className="font-weight-bolder text-embers-4">Cat house data</h2>
      <DataPage/>
      </Row>
    <Row className="p-4">
      <h2 className="font-weight-bolder text-embers-2">Control station</h2>
      <ControlPage />
    </Row>
  </Container>

const condition = authUser => authUser;

export default withAuthorization(condition)(HomePage);
