import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Code,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
  Button,
} from '@forge/ui';
import api, { route } from '@forge/api';

const getAllIssues = async (allIssues, setAllIssues) => {
  const currentIssues = [...allIssues];
  const allProjects = 'project is not EMPTY';
  const startAt = 0;
  const maxResults = 50;
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  const KTProject = 'project = "KT"';
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=project is not EMPTY&startAt=0&maxResults=10&fields=summary,comment`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );


  const json = await result.json();
  console.log(json);
  setAllIssues(JSON.stringify(json, null, 2));
  return json;
};

export default function () {
  const [allIssues, setAllIssues] = useState('loading...');
  const [count, setCount] = useState(0);

  useEffect(async () => {
    // const allIssues = 
    await getAllIssues(allIssues, setAllIssues);
    // reTryCatch(allIssues, setAllIssues);

    // setAllIssues(allIssues);
  }, []);

  // setAllIssues(getAllIssues());
  console.log('hello there!');
  console.log(allIssues);

  return (
    <GlobalPage>
      <Fragment>
        <Text>Hello, world from MyLabGlobalPage!</Text>
        <Text><Code text={allIssues} /></Text>
        {/* <Text><Code text={JSON.stringify(allIssues, null, 2)} /></Text> */}
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