import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Table, Col, Row} from 'react-bootstrap';

class DataPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_in: []
    }
  }


  render() {
    const {data_in} = this.state;
    return(
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>UID</th>
                  <th>Food</th>
                  <th>Temperature</th>
                  <th>Water</th>
                </tr>
              </thead>
              <tbody>
                {data_in.map(item => (
                  <tr key={item.uid}>
                    <td>{item.uid}</td>
                    <td>{item.food}</td>
                    <td>{item.temperature}</td>
                    <td>{item.water}</td>
                  </tr>
                ))
               }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.props.firebase.data_in().limitToLast(10).on('value', snapshot => {
      const data = snapshot.val();
      const data_list = Object.keys(data).map(key => ({ ...data[key], uid: key}));
      this.setState({data_in: data_list});
    })
  }

  componentWillUnmount() {
    this.props.firebase.data_in().off();
  }

}

export default withFirebase(DataPage);
