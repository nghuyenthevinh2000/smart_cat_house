import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import * as ROUTES from '../../constants/routes';

import {Form, Container, Button, Col, Row} from 'react-bootstrap';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

const SignInPage = () =>
  <Container fuild="lg">
    <h1>Sign In</h1>
    <h2>Use your email to sign in</h2>
    <Row className="justify-content-center">
      <Col lg={4}>
        <SignInForm />
      </Col>
    </Row>
    <SignUpLink className="text-center p-2 m-2"/>
    <PasswordForgetLink className="text-center"/>
  </Container>;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = (event) => {
    const {email, password} = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email, password)
    .then(authUser => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => this.setState({error}));

    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {email, password, error} = this.state;
    const isInvalid = email === '' || password === '';
    return(
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="p-2">
            <Form.Label>Email</Form.Label>
            <Form.Control size="lg" type="email" name="email" onChange={this.onChange} placeholder="Email"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control size="lg" type="password" name="password" onChange={this.onChange} placeholder="Password"/>
          </Form.Group>
          {error && <p className="alert">{error.message}</p>}
          <Col className="text-center">
            <Button className="btn-lg btn-embers-1" type="submit" disabled={isInvalid}>Sign in</Button>
          </Col>
        </Form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export {SignInForm};
