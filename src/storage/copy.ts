import * as fs from 'fs/promises';
import * as path from 'path';
import { getImageFile } from './get-image-file';

export class CopyImage {
  private readonly source = getImageFile();

  constructor(private readonly storage: string) {}

  async toStorage(filename: string): Promise<void> {
    const destination = path.join(this.storage, filename);
    await fs.copyFile(this.source, destination);
  }
}
