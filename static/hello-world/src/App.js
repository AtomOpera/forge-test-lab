import "@atlaskit/css-reset";
import React, { useEffect, useState } from 'react';
import SmartUserPicker from '@atlaskit/smart-user-picker';
import { IntlProvider } from 'react-intl-next';
import { invoke } from '@forge/bridge';
import { Queue } from '@forge/events';

const queue = new Queue({ key: 'queue-name' });


function App() {
  const [data, setData] = useState(undefined);
  const [allIssues, setAllIssues] = useState([]);
  const [numOfIssues, setNumOfIssues] = useState(0);
  const [loading, setLoading] = useState(true);

  const reTryCatch = async () => {
    let data;
    let isFinished = false;
    let currentData = { ...data } || {};
    let currentIssues = [...allIssues] || [];
    let startAt = 0;
    const maxResults = 100;
    while (!isFinished) {

      // invoke('getText', { startAt: 0, maxResults: 3 }).then(setData);
      console.log('currentIssues.length', currentIssues.length);

      data = await invoke('getText', { startAt: startAt + currentIssues.length, maxResults });
      const jsonData = JSON.parse(data);
      console.log('data', data);
      console.log('jsonData', jsonData);
      setData({ ...currentData, jsonData });
      // setTheArray(oldArray => [...oldArray, newElement]);
      setAllIssues(allIssues => [...allIssues, ...jsonData.issues.map((issue) => issue.key)]);
      // const currentIss = allIssues => [...allIssues, ...jsonData.issues.map((issue) => issue.key)];
      // setNumOfIssues(currentIss.length);
      console.log('arrayarray ', [...currentIssues, ...jsonData.issues.map((issue) => issue.key)]);
      // setData(jsonData);
      console.log('currentIssues.length', currentIssues.length);
      startAt = startAt + maxResults;
      // isFinished = true;
      if (jsonData.issues.map((issue) => issue.key).length === 0) {
        isFinished = true;
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    reTryCatch();
    // invoke('getText', { startAt: 0, maxResults: 3 }).then(setData);
  }, []);

  useEffect(() => {
    setNumOfIssues(allIssues.length);
    // invoke('getText', { startAt: 0, maxResults: 3 }).then(setData);
  }, [allIssues]);

  useEffect(async () => {
    // Push a single event with string payload
    await queue.push('hello world');
  }, []);

  if (data) {
    console.log('data.issues', data.issues);
  }

  // const keys = data 
  //   ? (data.issues.map((issue) => issue.key).join(', '))
  //   : 'Loading...';

  return (

    <>
      <div>
        <h1>
          Hi user pickers!
        </h1>
        <IntlProvider locale="en">
          <p>
            <SmartUserPicker
              fieldId="test"
              productKey="test"
              siteId="test"
              defaultValue={{ id: "1", name: "Bob", type: "user" }} />
          </p>
          <div>
            <SmartUserPicker
              includeUsers
              maxOptions={10}
              fieldId="users"
              siteId="invalid-site-id"
              productKey="jira" />
          </div>
        </IntlProvider>
        <h2>Hello! There is going to be data here:</h2>
        {/* {keys} */}
        {numOfIssues}
        <><br /><br /></>
        {allIssues.join(', ')}
        <><br /><br /></>
        {loading && 'Loading...'}

        {/* {JSON.stringify(data)} */}
        {/* <div>
          {allIssues}
        </div> */}
      </div>
    </>
  );
}

export default App;
