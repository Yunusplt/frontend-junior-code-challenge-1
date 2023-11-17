import React, { useEffect, useState } from 'react';
import Papa from "papaparse";
import Artikel from "../assets/Artikel.csv"


const Home = () => {
    
    const [data, setData] = useState([])



useEffect(() => {
        const getData = async () => {
          const response = await fetch(Artikel);
          console.log(response);
          const reader = response.body.getReader();
          const result = await reader.read();
          const text = new TextDecoder().decode(result.value);
          const parsedData = Papa.parse(text, { header: true }).data;
          setData(parsedData);
        };
        getData()
}, [])


  return (
    <div>
    <h1>Hello</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home