import React from 'react';
import {withRouter} from 'react-router-dom';

import {AuthUserContext} from './context';
import * as ROUTES from '../../constants/routes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    render() {
      return (
        <AuthUserContext.Consumer>
          {state => state.username ? <Component authUser={state} bus={state.bus}/> : null}
        </AuthUserContext.Consumer>
      );
    }

     componentDidMount() {
      if (!cookies.get('cat_house_username')) {
        this.props.history.push(ROUTES.SIGN_IN);
      }
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
