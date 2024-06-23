declare global {
  interface Window {
    webpSupport: boolean;
  }
}

const supportsWebp = async (): Promise<boolean> => {
  // eslint-disable-next-line no-restricted-globals
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then((r) => r.blob());
  return createImageBitmap(blob).then(
    () => true,
    () => false,
  );
};

export const checkWebpSupport = (): void => {
  window.webpSupport = false;
  supportsWebp().then((data) => (window.webpSupport = data));
};

export const getWebpSupport = () => window.webpSupport;

const allowedToSwitch = ['png', 'jpg', 'jpeg', 'webp'];

export const generateWebpPath = (path: string, webpSupport: boolean ) => {
  if (!path || typeof path !== 'string') {
    return '';
  }
  const pathAndParams = path.split('?');
  const fileExt = pathAndParams[0].split('.').slice(-1)[0];
  const paramsPart = pathAndParams.length > 1 && pathAndParams[1]
    ? `?${pathAndParams[1]}`
    : '';
  return webpSupport && allowedToSwitch.includes(fileExt.toLowerCase())
    ? `${pathAndParams[0].substr(
      0,
      pathAndParams[0].lastIndexOf('.'),
    )}.webp${paramsPart}`
    : path;
};
