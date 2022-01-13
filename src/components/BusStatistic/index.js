import React, {Component, useState, useEffect} from 'react';
import {withFirebase} from '../Firebase';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {BUS} from '../../constants/mac';
import * as luxon from 'luxon';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-muted">{`Time: ${label}`}</p>
        <p className="text-embers-3">{`Number of bus: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


const BusStatistic = (props) => {
  const [busData, setBusData] = useState([])

  useEffect(() => {
    const start = luxon.DateTime.local().startOf('day').toMillis();
    const end = luxon.DateTime.local().endOf('day').toMillis();
    // props.firebase.data_in(props.espid).orderByKey().startAt(start.toString()).endAt(end.toString()).on('value' , snapshot => {
    props.firebase.data_in(props.espid).orderByKey().on('value', snapshot => {
       let data = snapshot.val();
       data = data ? data : [];
       const new_data = Object.keys(data).map(key => {
          const time = new Date(parseInt(key))
          const bus_plate = BUS[data[key]]
          return {'time': time, 'bus_plate': bus_plate}
       })

       setBusData(processData(new_data))
    })
  }, [props.espid])

  const processData = (data) => {
    data.map(item => {
      item.time.setSeconds(0)
      item.time.setMinutes((Math.floor(item.time.getMinutes() / 30)) * 30)
      item.time = item.time.toLocaleString()
      return item
    })

    let new_data = {}
    for(let i = 0; i < data.length; i++) {
      if(data[i].time in new_data) {
        new_data[data[i].time] += 1
      }
      else {
        new_data[data[i].time] = 0
      }
    }

    return Object.keys(new_data).map(key => ({
      'time': key,
      'number_of_bus': new_data[key]
    }))
  }

  return (
      <ResponsiveContainer width="100%" height={520}>
        <LineChart data={busData} margin={{ top: 20, right: 96, left: 96, bottom: 0 }}>
          <Line type="monotone"
            dataKey="number_of_bus"
            dot={true}
            stroke="#F64668"
            fill="#F64668"
            strokeWidth={2}/>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
          <XAxis dataKey="time" margin={{bottom: 10}} interval="preserveEnd"/>
          <YAxis/>
          <Legend iconType="plainline"  verticalAlign="top" align="center"/>
          <Tooltip content={<CustomTooltip />}/>
        </LineChart>
      </ResponsiveContainer>
  )
}

export default withFirebase(BusStatistic);
