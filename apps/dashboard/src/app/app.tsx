import { useState, useEffect } from 'react';
import { environment } from '../environments/environment';
import { ToastContainer } from 'react-toastify';
import { appPreloader } from '@lib/helper';
import { appStateStore } from '@lib/user';
import { AppMainLoader } from '@lib/ui';
import { MainLayout } from './layouts/main.layout';
import { AppRouter } from './router/router';
import { CommonDataPreloader } from '@lib/common';


appPreloader(environment);

export function App() {
  const [showLoader, setLoaderState] = useState(false);
  const [allowToHideLoader, setAllowToHideState] = useState(false);

  const appReady = appStateStore((state) => state.appReady);
  const isAuth = appStateStore((state) => state.isAuth);
  const displayAppLoader = appStateStore((state) => state.displayAppLoader);

  useEffect(() => {
    if (displayAppLoader) {
      setLoaderState(true);
    }
  }, [displayAppLoader]);

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => setAllowToHideState(true), 1000);
    }
  }, [showLoader]);

  useEffect(() => {
    if (allowToHideLoader && appReady) {
      setLoaderState(false);
    }
  }, [allowToHideLoader, appReady, displayAppLoader]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/*{showLoader && (*/}
      {/*  <AppMainLoader />*/}
      {/*)}*/}
      {/*{appReady && !showLoader && (*/}
        <MainLayout>
          <AppRouter />
        </MainLayout>
      {/*)}*/}
      <CommonDataPreloader readyToLoad={isAuth} />
    </>
  );
}

export default App;
