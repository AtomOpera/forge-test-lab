import ForgeUI, { render, Fragment, Text, IssuePanel, GlobalPage } from '@forge/ui';
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
