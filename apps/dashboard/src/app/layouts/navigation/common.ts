import { appRoutes } from '@lib/helper';


type IBONavLinkCommonProps = {
  title: string;
}

export type IBONavLink = IBONavLinkCommonProps & {
  path: string;
}

type IBOSelfExcludingPathAndItems = {
  path: string;
  items?: never;
} | {
  path?: never;
  items: IBONavLink[];
  section: string;
}

export type BaseIBONavLink = IBOSelfExcludingPathAndItems & IBONavLinkCommonProps

export const boNavLinksMap: BaseIBONavLink[] = [
  {
    path: appRoutes.users,
    title: 'Users',
  },
  // {
  //   title: 'Manager',
  //   section: boRoutes.manager,
  //   items: [
  //     {
  //       path: boRoutes.managerAccounts,
  //       title: 'Accounts',
  //     },
  //     {
  //       path: boRoutes.managerReports,
  //       title: 'Reports',
  //     },
  //   ],
  // },
];
