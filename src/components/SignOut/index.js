import React, Component from 'react';
import {withFirebase} from '../Firebase';
import {NavLink} from 'react-bootstrap';

class SignOutLink extends Component {
  render() {
    return (
      <NavLink onClick={this.props.firebase.doSignOut}>
        Sign Out
      </NavLink>
    );
  }
}

export default withFirebase(SignOutLink);
