import React, {Component} from 'react';

import {Container} from 'react-bootstrap';


class Footer extends Component {
  render() {
    return (
      <footer className="text-center text-muted fixed-bottom p-4">
        <Container>
          © 2021 Copyright: Group 10 IoT Smart cat home
        </Container>
      </footer>
    );
  }
}

export default Footer;
