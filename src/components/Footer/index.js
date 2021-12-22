import React, {Component} from 'react';

import {Container} from 'react-bootstrap';


class Footer extends Component {
  render() {
    return (
      <footer className="text-center text-muted fixed-bottom p-4">
        <Container>
          © 2021 Project 3 of Nguyen The Vinh
        </Container>
      </footer>
    );
  }
}

export default Footer;
