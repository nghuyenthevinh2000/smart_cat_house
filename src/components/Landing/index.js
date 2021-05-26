import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import * as ROUTES from '../../constants/routes';

class LandingPage extends Component {
  render() {
    this.props.history.push(ROUTES.HOME);
    return(
      <p>
      </p>
    );
  }
}

const condition = authUser => authUser;

export default withAuthorization(condition)(LandingPage);
