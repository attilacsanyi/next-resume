/**
 * Downloads a file from a given URL by triggering a browser download
 * @param url - The URL to fetch the file from
 * @param fallbackFileName - Fallback filename if Content-Disposition header is not present
 * @throws Error if the fetch request fails
 */
export const downloadFile = async (
  url: string,
  fallbackFileName = 'download.pdf'
): Promise<void> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const contentDisposition = response.headers.get('Content-Disposition');
  const fileName =
    contentDisposition?.match(/filename="(.+)"/)?.[1] || fallbackFileName;

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(objectUrl);
};
