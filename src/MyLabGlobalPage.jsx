import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
} from '@forge/ui';
import api, { route } from '@forge/api';

const getAllIssues = async () => {
  const allProjects = 'project is not EMPTY';
  const KTProject = 'project = "KT"';
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=${allProjects}`
    );


  const json = await result.json();
  console.log(json);
  return json;
};

export default function () {
  const [allIssues, setAllIssues] = useState('');

  useEffect(async () => {
    const allIssues = await getAllIssues();

    setAllIssues(allIssues);
  }, []);

  // setAllIssues(getAllIssues());
  console.log('hello there!');
  console.log(allIssues);

  return (
    <GlobalPage>
      <Fragment>
        <Text>Hello, world from MyLabGlobalPage!</Text>
        <Text>{JSON.stringify(allIssues, null, 2)}</Text>
      </Fragment>
    </GlobalPage>
  );
};