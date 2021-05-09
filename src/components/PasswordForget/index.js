import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';

const PasswordForgetPage = () =>
  <Container>
    <h1>Password Forget</h1>
    <h2>Send your email here</h2>
    <Row className="justify-content-center">
      <Col lg={4}>
        <PasswordForgetForm />
      </Col>
    </Row>
  </Container>;


const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onSubmit = (event) => {
    const {email} = this.state;
    this.props.firebase.doPasswordReset(email.trim())
    .then(() => {this.setState({...INITIAL_STATE})})
    .catch(error => {this.setState({error})});

    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {email, error} = this.state;
    const isInvalid = email === '';
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control size="lg" type="email" name="email" onChange={this.onChange} placeholder="Email"/>
        </Form.Group>
        {error && <p className="alert">{error.message}</p>}
        <p className="p-4 text-center">
          <Button className="btn-lg btn-embers-1" type="subit" disabled={isInvalid}>Submit</Button>
        </p>
      </Form>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = (props) =>
  <p {...props}>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;
export {PasswordForgetForm, PasswordForgetLink};
