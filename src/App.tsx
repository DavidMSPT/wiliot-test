import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/header';
import TempInfo from './components/tempInfo';
import TableChart from './components/tableChart';

const W3CWebSocket = require('websocket').w3cwebsocket;
let client = new W3CWebSocket('ws://localhost:8999');
interface socketResponse {
  id: number
  timestamp: number;
  temperature: number
  data: number
}

const App = () => {

  const [data1, setData1] = useState<socketResponse[]>([]);
  const [data2, setData2] = useState<socketResponse[]>([]);
  
  // open Toast to inform socket connection
  client.onopen = () => {
    toast.info('Socket Connected');
  };

  client.onmessage = (responseData: any) => {
    //parse the data that comes from socket
    let dataFromServer: socketResponse[] = JSON.parse(responseData.data);

    // filter by id = 1  and data <= 100
    let serverData1: socketResponse[] = dataFromServer.filter(data => data.id === 1 && data.data <= 100 );

    // add eligible data to an array
    setData1((previousData1) => {
      // challenge said to save 5 mins of data but since the socket sends data every .2 secs
      // it would generate an enourmous amount of data to be displayed in the chart.
      // time interval was set to 10 secs instead. 
      // after 10 secs, the first data object is removed from the array, as a new one comes
      if (Date.now() - previousData1[0]?.timestamp > 10000) {
        previousData1.shift();
      }
      return previousData1?.concat(serverData1);
    });

    // filter by id = 2  and data <= 100
    let serverData2: socketResponse[] = dataFromServer.filter(data => data.id === 2 && data.data <= 100 );

    // add eligible data to an array
    setData2((previousData2) => {
      // same thing as in setData1()
      if (Date.now() - previousData2[0]?.timestamp > 10000) {
        previousData2.shift();
      }
      return previousData2?.concat(serverData2);
    });
  };
  
  // open Toast to inform socket closure
  client.onclose = () => {
    toast.warn('Socket Disconnected');
  }

  // add latest retrieved temperature to variable to display it in the ID blocks
  const temp1 = data1[data1.length - 1]?.temperature;
  const temp2 = data2[data2.length - 1]?.temperature;

  // Map timestamp and temperature to a format recognized by the chart
  const chartData1 = data1.map(info => ({
    x: new Date(info.timestamp),
    y: info.temperature}))
  const chartData2 = data2.map(info => ({
    x: new Date(info.timestamp),
    y: info.temperature}))
  

  return (
    <div className="App">
      <ToastContainer position="top-center"/>
      <header className="App-header">
        <Header />
      </header>

      <div className='informationBlocks'>
        <TempInfo id='ID 1' value={temp1} />
        <TempInfo id='ID 2' value={temp2} />        
      </div>

      <div className='chartBlock'>
      <TableChart 
        id1="ID1"
        id2="ID2"
        data1={chartData1} 
        data2={chartData2}/>
      </div>
    </div>
  );
}

export default App;

