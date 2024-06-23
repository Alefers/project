import { useState } from 'react';
import type { FC } from 'react';
import s from './users.module.scss';
import { ContentLoader } from '@lib/ui';
import { PageTabs } from '../../sections/page-tabs';
import { boUserViewTabsMap, EUserViewTabs } from './common';


interface IUser {
  id: string,
  name: string,
  age: number,
}

const users: IUser[] = [
  {
    id: '1',
    name: 'Anton',
    age: 40,
  },
  {
    id: '2',
    name: 'Jura',
    age: 24,
  },
];

const UsersPage: FC = () => {
  const [tab, setTab] = useState(EUserViewTabs.INFO);

  return (
    <div className={s.usersPage}>
      <h1>
        Users
      </h1>

      <PageTabs
        current={tab}
        tabsMap={boUserViewTabsMap}
        setTab={setTab}
      />

      <ContentLoader isLoading={false}>
        {[].length > 0 ? (
          <table className="page-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.age}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data-text">
            No data
          </div>
        )}
      </ContentLoader>
    </div>
  );
};

export default UsersPage;