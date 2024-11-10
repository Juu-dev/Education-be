type FileDocument = {
  url: string;
  previewUrl?: string;
  thumbUrl?: string;
  isGoogleDrive?: boolean;
};

export function parseUrls<T extends FileDocument>(fileDocument: T) {
  if (fileDocument.url && !fileDocument.url.includes('http')) {
    fileDocument.url = `${process.env.CDN_URL}/${fileDocument.url}`;
  }

  if (fileDocument.previewUrl && !fileDocument.previewUrl.includes('http')) {
    fileDocument.previewUrl = `${process.env.CDN_URL}/${fileDocument.previewUrl}`;
  }

  if (fileDocument.thumbUrl && !fileDocument.thumbUrl.includes('http')) {
    fileDocument.thumbUrl = `${process.env.CDN_URL}/${fileDocument.thumbUrl}`;
  }
}
