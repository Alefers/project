import { AppConfig, setAppConfig } from './config';
import { checkWebpSupport } from './utils';


export const appPreloader = (env: AppConfig): void => {
  setAppConfig(env);

  checkWebpSupport();
};
