import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [data, setData] = useState(null);
  const [allIssues, setAllIssues] = useState('loading...');

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const keys = data 
    ? (JSON.parse(data).issues.map((issue) => issue.key).join(', '))
    : 'Loading...';

  return (
    <div>
      <h2>Hello! There is going to be data here:</h2>
      {keys}
      {/* <div>
        {allIssues}
      </div> */}
    </div>
  );
}

export default App;
