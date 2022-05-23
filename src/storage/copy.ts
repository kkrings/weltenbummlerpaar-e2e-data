import * as fs from 'fs/promises';
import * as path from 'path';

export class CopyImage {
  private readonly source = path.join(__dirname, '../assets/image.jpeg');

  constructor(private readonly storage: string) {}

  async toStorage(filename: string): Promise<void> {
    const destination = path.join(this.storage, filename);
    await fs.copyFile(this.source, destination);
  }
}
