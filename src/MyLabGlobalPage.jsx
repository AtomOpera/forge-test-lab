import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Strong,
  Code,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
  Button,
  render,
  Macro,
  Table,
  Head,
  Cell,
  Row,
} from '@forge/ui';
import api, { route } from '@forge/api';
import { Queue } from '@forge/events';

const getCurrentUser = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/myself`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  // console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
  const userJson = await response.json();
  return userJson;
};

export default function () {
  const [allIssues, setAllIssues] = useState('loading...');
  const [issuesCommentedByUser, setIssuesCommentedByUser] = useState('loading...');
  const [issuesInTableFormat, setIssuesInTableFormat] = useState([]);
  const [jobStatus, setJobStatus] = useState(undefined);
  const [jobId, setJobId] = useState(undefined);
  const [displayStatus, setDisplayStatus] = useState('loading...');
  const [currentUser, setCurrentUser] = useState(undefined);
  const [count, setCount] = useState(0);
  const queue = new Queue({ key: 'queue-name' });

  const refreshStatus = async () => {
    const jobProgress = queue.getJob(jobId);
    const response = await jobProgress.getStats();
    const jsonResp = await response.json();
    setJobStatus(jsonResp);
  };

  useEffect(async () => {
    const newJobId = await queue.push('hello world');
    setJobId(newJobId);
    const jobProgress = queue.getJob(newJobId);
    // Get stats of a particular job
    const response = await jobProgress.getStats();
    const jsonResp = await response.json();
    setJobStatus(jsonResp);
    // setJobStatus({ success, inProgress, failed });

    const currentUserResp = await getCurrentUser();
    setCurrentUser(currentUserResp);
  }, []);

  useEffect(async () => {
    console.log('jobId', jobId);
    if (!jobId || jobStatus?.success === 1) return;
    const jobProgress = queue.getJob(jobId);
    const response = await jobProgress.getStats();
    const jsonResp = await response.json();
    setJobStatus(jsonResp);
  }, [jobStatus, jobId]);


  return (
    <GlobalPage>
      <Fragment>
        <Text>{JSON.stringify(jobStatus)}</Text>
        <Button
          text={'refresh stats'}
          onClick={async () => {
            const jobProgress = queue.getJob(jobId);
            const response = await jobProgress.getStats();
            const jsonResp = await response.json();
            setJobStatus(jsonResp);
          }}
        />
        <Button
          text={'refresh stats with function'}
          onClick={async () => await refreshStatus()}
        />
        <Button
          text={'refresh stats with function - no await'}
          onClick={refreshStatus}
        />
        {/* <Text>{jobStatus?.success}</Text>
        <Text>{jobStatus?.inProgress}</Text>
        <Text>{jobStatus?.sufailedccess}</Text> */}
        <Text>Hello <Strong>{currentUser?.displayName || 'loading...'}</Strong> from MyForgeLabGlobalPage</Text>

        <Button
          text={`Count is ${count}`}
          onClick={() => {
            setCount(count + 1);
          }}
        />
      </Fragment>
    </GlobalPage>
  );
};