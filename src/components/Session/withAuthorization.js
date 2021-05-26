import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import {AuthUserContext} from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends Component {

    render() {
      return (
        <AuthUserContext.Consumer>
          {state => condition(state.authUser) ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if(!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

  }
  return withRouter(withFirebase(WithAuthorization));
}

export default withAuthorization;
