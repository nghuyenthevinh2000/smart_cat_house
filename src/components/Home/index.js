import React, {Component} from 'react';
import {withAuthorization} from '../Session';
import {withFirebase} from '../Firebase';
import DataPage from '../Data';
import Overview from '../Overview';
import BusStatistic from '../BusStatistic';
import {Container, Row, Col, Button, Tab, Nav, Carousel} from 'react-bootstrap';
import hash from 'object-hash';
import * as BUS_CONFIG from '../../constants/mac';



class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const house = BUS_CONFIG.MAC[this.props.bus];
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
              <Nav.Link eventKey="third">Statistic</Nav.Link>
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

              <Tab.Pane eventKey="third">
                <Row className="p-4">
                  <h2 className="gradient-3">Number of bus every 30 minutes</h2>
                  {house && <BusStatistic espid={house}/>}
                </Row>
              </Tab.Pane>

          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  }

}

export default withFirebase(withAuthorization(withFirebase(HomePage)));
