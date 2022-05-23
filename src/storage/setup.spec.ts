import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { getImages } from '../payloads/get-images';
import { setupStorage, TeardownStorage } from './setup';

describe('setupStorage', () => {
  let storage: string;
  let teardownStorage: TeardownStorage;
  let storageAfterSetup: string[];
  let storageAfterTeardown: string[];

  beforeEach(async () => {
    storage = await fs.mkdtemp(
      path.join(os.tmpdir(), 'weltenbummlerpaar-e2e-data-'),
    );
  });

  beforeEach(async () => {
    teardownStorage = await setupStorage(storage);
  });

  beforeEach(async () => {
    storageAfterSetup = await fs.readdir(storage);
  });

  beforeEach(async () => {
    const content = 'This is a test file.\n';
    await fs.writeFile(path.join(storage, 'test.txt'), content);
  });

  beforeEach(async () => {
    await teardownStorage();
  });

  beforeEach(async () => {
    storageAfterTeardown = await fs.readdir(storage);
  });

  it('images should have been copied to storage', () => {
    expect(storageAfterSetup).toEqual(
      getImages().map((image) => `${image.id}.jpeg`),
    );
  });

  it('storage should have been cleared', () => {
    expect(storageAfterTeardown).toEqual([]);
  });

  afterEach(async () => {
    await fs.rm(storage, { recursive: true, force: true });
  });
});
