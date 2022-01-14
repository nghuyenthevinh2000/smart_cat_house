import React, {Component, useState, useEffect} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Row, Col, Card} from 'react-bootstrap';
import * as BUS_CONFIG from '../../constants/mac';
import * as luxon from 'luxon';

// class Overview extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       uid: '',
//       number_of_bus_day: 0,
//       device_connected: false
//     }
//   }

//   render() {
//     const {number_of_bus_day, device_connected} = this.state;
//     return(
//       <Container>
//         <Row className="justify-content-evenly p-4">
//           <Col lg={4} className="text-center">
//             <Card>
//               <Card.Img src={process.env.PUBLIC_URL + "/bus_count.jpg"} className="shadow-lg"/>
//               <Card.Body>
//                 <Card.Title className="bus_number">Number of bus</Card.Title>
//                 <Card.Text className="p-4">
//                   <span>Number of bus in one day: </span>
//                   <span>{number_of_bus_day}</span>
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col lg={4} className="text-center">
//             <Card>
//               <Card.Img src={process.env.PUBLIC_URL + "/thirsty.jpeg"} className="shadow-lg"/>
//               <Card.Body>
//                 <Card.Title className="device_connected">Connected Device</Card.Title>
//                 <Card.Text className="p-4">
//                   <span>Is device connected? </span>
//                   <span>{device_connected.toString()}</span>
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   componentDidMount() {
//     const start = luxon.DateTime.local().startOf('day').toMillis();
//     const end = luxon.DateTime.local().endOf('day').toMillis();
//     let lastReport;

//     this.props.firebase.data_in(this.props.espid).orderByKey().on('value', snapshot => {
//     // this.props.firebase.data_in(this.props.espid).orderByKey().startAt(start.toString()).endAt(end.toString()).once('value', snapshot => {
//       const data = snapshot.val();
//       if(!data) return;

//       lastReport = luxon.DateTime.now().toMillis();

//       console.log("data = " + JSON.stringify(data));
//       //display total number of bus in one day
//       this.setState({number_of_bus_day : Object.keys(data).length});
//     })

//     setInterval(() => {
//       if(!lastReport){
//         this.setState({device_connected : false});
//         return;
//       }

//       if(luxon.DateTime.now().toMillis() - lastReport > 10*60*1000){
//         this.setState({device_connected : false});
//       }else{
//         this.setState({device_connected : true});
//       }
//     }, 10*60*1000);

//   }

//   componentWillUnmount() {
//     this.props.firebase.data_in(this.props.espid).off();
//   }

// }


const Overview = (props) => {
  const [uid, setUid] = useState('');
  const [numberOfBus, setNumberOfBus] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const start = luxon.DateTime.local().startOf('day').toMillis();
    const end = luxon.DateTime.local().endOf('day').toMillis();
    let lastReport;

    props.firebase.data_in(props.espid).orderByKey().on('value', snapshot => {
    // props.firebase.data_in(props.espid).orderByKey().startAt(start.toString()).endAt(end.toString()).on('value',snapshot => {
      let data = snapshot.val();
      data = data ? data : [];

      lastReport = luxon.DateTime.now().toMillis();

      // console.log("data = " + JSON.stringify(data));
      //display total number of bus in one day
      setNumberOfBus(Object.keys(data).length)

      setInterval(() => {
        if(!lastReport){
          setConnected(false)
          return;
        }

        if(luxon.DateTime.now().toMillis() - lastReport > 10*60*1000){
          setConnected(false)
        }else{
          setConnected(true)
        }
      }, 10*60*1000);
    })

    return () => {
       props.firebase.data_in(props.espid).off();
    }

  }, [props.espid])

  return (
    <Container>
      <Row className="justify-content-evenly p-4">
        <Col lg={4} className="text-center">
          <Card>
            <Card.Img src={process.env.PUBLIC_URL + "/bus_count.jpg"} className="shadow-lg"/>
            <Card.Body>
              <Card.Title className="bus_number">Number of bus</Card.Title>
              <Card.Text className="p-4">
                <span>Number of bus in one day: </span>
                <span>{numberOfBus}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="text-center">
          <Card>
            <Card.Img src={process.env.PUBLIC_URL + "/thirsty.jpeg"} className="shadow-lg"/>
            <Card.Body>
              <Card.Title className="device_connected">Connected Device</Card.Title>
              <Card.Text className="p-4">
                <span>Is device connected? </span>
                <span>{connected.toString()}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withFirebase(Overview);
