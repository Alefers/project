declare global {
  interface Window {

  }
}

export interface AppConfig extends Record<string, unknown> {

}

let config: AppConfig = {

};

export const setAppConfig = (data: AppConfig) => {
  config = {...config, ...data};
}
