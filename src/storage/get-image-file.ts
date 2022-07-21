import * as path from 'path';

type Extension = 'jpg' | 'png';

export const getImageFile = (extension: Extension = 'jpg'): string =>
  path.join(__dirname, `../../assets/image.${extension}`);
