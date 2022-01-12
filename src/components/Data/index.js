import React, {Component, useState, useEffect} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Table, Col, Row} from 'react-bootstrap';
import {BUS} from '../../constants/mac';

// class DataPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data_in: []
//     }
//   }

//   render() {
//     const {data_in} = this.state;
//     return(
//       <Container>
//         <Row className="justify-content-center">
//           <Col lg={12}>
//             <Table hover className="text-center align-middle">
//               <thead>
//                 <tr>
//                   <th className="text-embers-3">Received Time</th>
//                   <th className="text-embers-6">Food</th>
//                   <th className="text-embers-4">Temperature</th>
//                   <th className="text-embers-5">Water</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data_in.map(item => (
//                   <tr key={item.uid}>
//                     <td className="p-4">{item.uid}</td>
//                     <td>{item.food}</td>
//                     <td>{item.temperature}</td>
//                     <td>{item.water}</td>
//                   </tr>
//                 ))
//                }
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   componentDidMount() {

//     this.props.firebase.data_in(this.props.espid).limitToLast(10).on('value', snapshot => {
//       const data = snapshot.val();
//       const data_list = Object.keys(data).map(key => ({ ...data[key], uid: key}));
//       this.setState({data_in: data_list});
//     })
//   }

//   componentWillUnmount() {
//     this.props.firebase.data_in(this.props.espid).off();
//   }

// }

const DataPage = (props) => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    props.firebase.data_in(props.espid).once('value', snapshot => {
      const data = snapshot.val()
      setBusData(Object.keys(data).map(key => {
        const time = new Date(parseInt(key))
        const bus_plate = BUS[data[key]]
        return {'time': time.toLocaleString(), 'bus_plate': bus_plate}
      }))
    })
  }, [])

  return(
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
        <Table className="align-middle text-center">
          <thead>
            <tr>
              <th>Time</th>
              <th>Bus</th>
            </tr>
          </thead>
          <tbody>
            {busData.map(data =>
              <tr key={data.time}>
                <td>{data.time}</td>
                <td>{data.bus_plate}</td>
              </tr>
            )}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  )
}


export default withFirebase(DataPage);
