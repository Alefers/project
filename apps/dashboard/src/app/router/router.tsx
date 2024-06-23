import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersRouter } from './users.router';
import { appStateStore } from '@lib/user';
import { sectionRoutes, appRoutes } from '@lib/helper';


export const AppRouter = () => {
  const isAuth = appStateStore((state) => state.isAuth);

  return (
    <Routes>
      <Route
        path={sectionRoutes.users}
        element={<UsersRouter />}
      />

      {/* Redirects */}

      <Route
        path="*"
        element={<Navigate to={ appRoutes.home} replace/>}
      />
    </Routes>
  );
};