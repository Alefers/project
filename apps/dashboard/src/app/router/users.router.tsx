import { Suspense, lazy } from 'react';
import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from '@lib/helper';


const Users = lazy(() => import('../pages/user/users.page'));
// const UserEdit = lazyWithRetry(() => import('../pages/user/user-edit.page'));

export const UsersRouter: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <Users />
          </Suspense>
        }
      />
      {/*<Route*/}
      {/*  path="/view/:userId"*/}
      {/*  element={*/}
      {/*    <Suspense fallback={null}>*/}
      {/*      <UserView />*/}
      {/*    </Suspense>*/}
      {/*  }*/}
      {/*/>*/}
      <Route path="*" element={<Navigate to={appRoutes.users} replace/>}/>
    </Routes>
  );
};
