import ForgeUI, { render, Fragment, Text, IssuePanel } from '@forge/ui';
import MyLabProjectPage from './MyLabProjectPage';
import MyLabIssuePage from './MyLabIssuePage';
import MyLabGlancePage from './MyLabGlancePage';

export const Project = render(
  <MyLabProjectPage />
);

export const Glance = render(
  <MyLabGlancePage />
);

export const Issue = render(
  <MyLabIssuePage />
);
