export const imitateFileDownloadClick = (fileUrl: string, fileName?: string) => {
  const fileUrlMap = fileUrl.split('/');
  const tempFileName = fileUrlMap[fileUrlMap.length - 1];
  const link = document.createElement('a');
  link.classList.add('hidden');
  link.href = fileUrl;
  link.download = fileName || tempFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
