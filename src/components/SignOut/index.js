import React from 'react';
import {withFirebase} from '../Firebase';
import {NavLink} from 'react-bootstrap';

const SignOutLink = ({firebase}) =>
  <NavLink onClick={firebase.doSignOut}>
    Sign Out
  </NavLink>

export default withFirebase(SignOutLink);
