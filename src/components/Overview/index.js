import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Row, Col, Card} from 'react-bootstrap';
import * as BUS_CONFIG from '../../constants/mac';
import * as luxon from 'luxon';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
    }
  }

  render() {
    const {food, temperature, water} = this.state;
    return(
      <Container>
        <Row className="justify-content-left p-4">
          <Col lg={4} className="text-center">
            <Card>
              {temperature > 30 ?
                <Card.Img src={process.env.PUBLIC_URL + "/thesun.png"} className="shadow-lg"/> :
                <Card.Img src={process.env.PUBLIC_URL + "/cloud.jpeg"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="temperature">Temperature</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the temperature of the room<br/></span>
                  <span className={temperature > 30 ? "hot": "cold"}>{temperature}°C</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="text-center">
            <Card>
              {water ? <Card.Img src={process.env.PUBLIC_URL + "/water.png"} className="shadow-lg"/> :
              <Card.Img src={process.env.PUBLIC_URL + "/thirsty.jpeg"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="water">Water</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the amount of water<br/></span>
                  <span className={water ? "cold": "hot"}>{water}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="text-center">
            <Card>
              {food ? <Card.Img src={process.env.PUBLIC_URL + "/full.png"} className="shadow-lg"/> :
              <Card.Img src={process.env.PUBLIC_URL + "/hungry.png"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="food">Food</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the amount of food<br/></span>
                  <span className={food ? "cold": "hot"}>{food}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    // I suppose to get data from here
    console.log(`house/${this.props.espid}/data_in`);

    /*
    this.props.firebase.data_in(this.props.espid).limitToLast(BUS_CONFIG.SUPERFICIAL_MAX_NUMBER_BUX_IN_A_DAY).on('value', snapshot => {
      console.log("snapshot = " + snapshot);
      console.log("snapshot obj = " + JSON.stringify(snapshot));
      const data = snapshot.val();
      //TO DO: handle the case that data does not exist on database

      console.log("data = " + data);
      console.log("data obj = " + JSON.stringify(data));
      const key = Object.keys(data)[0];
      this.setState({uid: key, ...data[key]});
    })
    */

    const start = luxon.DateTime.local().startOf('day').toMillis();
    const end = luxon.DateTime.local().endOf('day').toMillis();

    this.props.firebase.data_in(this.props.espid).orderByKey().startAt(start.toString()).endAt(end.toString()).once('value', snapshot => {
      const data = snapshot.val();
      console.log("data = " + JSON.stringify(data));
    })

  }

  componentWillUnmount() {
    this.props.firebase.data_in(this.props.espid).off();
  }

}

export default withFirebase(Overview);
