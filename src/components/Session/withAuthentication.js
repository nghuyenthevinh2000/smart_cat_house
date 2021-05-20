import React from 'react';
import {AuthUserContext} from './context';
import {withFirebase} from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        username: '',
        email: '',
      }
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser ? this.props.firebase.user(authUser.uid).on('value', snapshot => {
          const user = snapshot.val();
          this.setState({authUser: authUser, username: user.username, email: user.email});
        }) : this.setState({authUser: null, username:'', email:''});
      })

    }

    componentWillUnmount() {
      this.listener();
    }
  }

  return withFirebase(WithAuthentication);

}

export {withAuthentication};
