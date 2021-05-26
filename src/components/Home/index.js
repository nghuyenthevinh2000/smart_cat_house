import React, {Component} from 'react';

import {withAuthorization} from '../Session';
import DataPage from '../Data';
import ControlPage from '../Control';
import Overview from '../Overview';
import TemperatureStatistic from '../TemperatureStatistic';
import WaterStatistic from '../WaterStatistic';
import FoodStatistic from '../FoodStatistic';
import {Container, Row, Col, Button, Tab, Nav, Carousel} from 'react-bootstrap';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: null,
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick = (event) => {
    let ctrl = this.state[event.target.name];
    ctrl = ctrl ? null : 1;

    this.setState({display: ctrl});
    console.log(this.state);
    this.props.firebase.control_out().update({[event.target.name]: ctrl});
  }


  render() {
    return(
      <Container>
        <Tab.Container defaultActiveKey="first">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="first">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Data table</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Control</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fouth">Statistic</Nav.Link>
            </Nav.Item>
          </Nav>
           <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row className="p-4">
                  <h2 className="gradient-1">Overview</h2>
                  <Overview />
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Row className="p-4">
                  <h2 className="gradient-2">Data table</h2>
                  <DataPage/>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                  <Row className="p-4">
                    <h2 className="gradient-3">Control station</h2>
                    <ControlPage />
                  </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="fouth">
                <Carousel className="p-4">
                  <Carousel.Item>
                    <h2 className="temperature">Temperature</h2>
                    <TemperatureStatistic />
                  </Carousel.Item>
                  <Carousel.Item>
                    <h2 className="water">Water</h2>
                    <WaterStatistic />
                  </Carousel.Item>
                  <Carousel.Item>
                    <h2 className="food">Food</h2>
                    <FoodStatistic />
                  </Carousel.Item>
                </Carousel>
              </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

{/*        <Row className="p-4 justify-content-center">
          <Col lg={2} className="text-center">
            <Button className={display ? "btn-embers-3" : "btn-embers-1"}
                        size="lg"
                        type="button"
                        name="display"
                        block="true"
                        onClick={this.onClick}>
                    {display ? 'On': 'Off'}
            </Button>
          </Col>
        </Row>*/}
        </Container>

    );
  }
}

const condition = authUser => authUser;

export default withAuthorization(condition)(HomePage);
