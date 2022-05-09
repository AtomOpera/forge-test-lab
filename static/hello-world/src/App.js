import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [data, setData] = useState(undefined);
  const [allIssues, setAllIssues] = useState([1, 2].join(', '));

  useEffect(async () => {
    let data;
    let isFinished = false;
    let currentData = {...data} || {};
    let currentIssues = [...allIssues] || [];
    let startAt = 0;
    const maxResults = 3;
    while (!isFinished) {
      
      // invoke('getText', { startAt: 0, maxResults: 3 }).then(setData);
      data = await invoke('getText', { startAt: startAt, maxResults });
      const jsonData = JSON.parse(data);
      console.log('data', data);
      console.log('jsonData', jsonData);
      setData({...currentData, jsonData});
      setAllIssues(jsonData.issues.map((issue) => issue.key).join(', '));
      // setData(jsonData);
      isFinished = true;
      if (data.length === 0) isFinished = true;
    }
    // invoke('getText', { startAt: 0, maxResults: 3 }).then(setData);
  }, []);

  if (data){
    console.log('data.issues', data.issues);
  }
  

  // const keys = data 
  //   ? (data.issues.map((issue) => issue.key).join(', '))
  //   : 'Loading...';

  return (
    <div>
      <h2>Hello! There is going to be data here:</h2>
      {/* {keys} */}
      {allIssues}
      <br />
      <br />
      {JSON.stringify(data)}
      {/* <div>
        {allIssues}
      </div> */}
    </div>
  );
}

export default App;
