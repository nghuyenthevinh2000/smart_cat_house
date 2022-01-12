import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import {withFirebase} from '../Firebase';
import DataPage from '../Data';
import Overview from '../Overview';
import TemperatureStatistic from '../TemperatureStatistic';
import WaterStatistic from '../WaterStatistic';
import FoodStatistic from '../FoodStatistic';
import {Container, Row, Col, Button, Tab, Nav, Carousel} from 'react-bootstrap';
import hash from 'object-hash';
import * as BUS_CONFIG from '../../constants/mac';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: null,
      house: null,
    }
  }

  render() {
    const {display, house} = this.state;
    return(
      <Container>
        <Tab.Container defaultActiveKey="second">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="first">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Data table</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fouth">Statistic</Nav.Link>
            </Nav.Item>
          </Nav>
           <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row className="p-4">
                  <h2 className="gradient-1">Overview</h2>
                  {house && <Overview espid={house}/>}
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="second">
                <Row className="p-4">
                  <h2 className="gradient-2">Data table</h2>
                  {house && <DataPage espid={house}/>}
                </Row>
              </Tab.Pane>

            {/*  <Tab.Pane eventKey="fouth">
                <Carousel className="p-4">
                  <Carousel.Item>
                    <h2 className="temperature">Temperature</h2>
                    {house && <TemperatureStatistic espid={house}/>}
                  </Carousel.Item>
                  <Carousel.Item>
                    <h2 className="water">Water</h2>
                    {house && <WaterStatistic espid={house}/>}
                  </Carousel.Item>
                  <Carousel.Item>
                    <h2 className="food">Food</h2>
                    {house && <FoodStatistic espid={house}/>}
                  </Carousel.Item>
                </Carousel>
              </Tab.Pane>*/}

          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  }

  componentDidMount() {
    const userId = hash(this.props.authUser.email);
    this.props.firebase.user(userId).once('value').then(snapshot => {
      const value = snapshot.val();
      this.setState({house : BUS_CONFIG.MAC[this.props.bus]});
    })
  }

}

export default withFirebase(withAuthorization(withFirebase(HomePage)));
