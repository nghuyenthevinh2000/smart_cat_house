import React, {Component, useState, useEffect} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Table, Col, Row} from 'react-bootstrap';
import {BUS} from '../../constants/mac';
import * as luxon from 'luxon';

const DataPage = (props) => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    const start = luxon.DateTime.local().startOf('day').toMillis();
    const end = luxon.DateTime.local().endOf('day').toMillis();
    // props.firebase.data_in(props.espid).orderByKey().startAt(start.toString()).endAt(end.toString()).on('value' , snapshot => {
    props.firebase.data_in(props.espid).once('value', snapshot => {
      let data = snapshot.val()
      data = data ? data : []
      setBusData(Object.keys(data).map(key => {
          const time = new Date(parseInt(key))
          const bus_plate = BUS[data[key]]
          return {'time': time.toLocaleString(), 'bus_plate': bus_plate}
        }))
    })

    return () => {
      props.firebase.data_in(props.espid).off()
    }
  }, [props.espid])

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
