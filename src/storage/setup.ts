import * as fs from 'fs/promises';
import * as path from 'path';
import { getImages } from '../payloads/get-images';
import { CopyImage } from './copy';

export async function setupStorage(storage: string): Promise<TeardownStorage> {
  const copyImage = new CopyImage(storage);

  await Promise.all(
    getImages().map(
      async (image) => await copyImage.toStorage(`${image.id}.jpg`),
    ),
  );

  return async () => await teardownStorage(storage);
}

async function teardownStorage(storage: string): Promise<void> {
  const images = await fs.readdir(storage);

  await Promise.all(
    images.map(async (image) => await fs.rm(path.join(storage, image))),
  );
}

export type TeardownStorage = () => ReturnType<typeof teardownStorage>;
