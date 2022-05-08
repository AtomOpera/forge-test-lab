import ForgeUI, { render, Fragment, Text, IssuePanel, GlobalPage } from '@forge/ui';
import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';
import MyLabProjectPage from './MyLabProjectPage';
import MyLabIssuePage from './MyLabIssuePage';
import MyLabGlancePage from './MyLabGlancePage';
import MyLabGlobalPage from './MyLabGlobalPage';

/**
 * Always start with;
 * forge login
 * 
 * And then to start the app if you haven't already done it before:
 * Run forge register to register a new copy of this app to your developer account
 * Run npm install to install your dependencies
 * Run forge deploy to deploy the app into the default environment
 * Run forge install and follow the prompts to install the app -OR- forge install --upgrade
 *  * No need to repeat the above if already done
 * 
 * forge tunnel to see changes live after install (needs docker to be running)!
 * 
 * and can use "forge logs" to debug
 */

export const Project = render(
  <MyLabProjectPage />
);

export const Glance = render(
  <MyLabGlancePage />
);

export const Issue = render(
  <MyLabIssuePage />
);

export const Global = render(
  <MyLabGlobalPage />
);

const resolver = new Resolver();

const getAllIssues = async () => {
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
  // console.log(json);
  // setAllIssues(JSON.stringify(json, null, 2));
  return json;
};

resolver.define('getText', async (req) => {
  console.log(req);
  const resp = await getAllIssues();
  // return resp;
  return JSON.stringify(resp, null, 2);

  // return 'Hello, this is some data for the world!';
});

export const handler = resolver.getDefinitions();
