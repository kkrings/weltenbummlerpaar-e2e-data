import { setupDB } from './database/setup';
import { setupStorage } from './storage/setup';
import { Config } from './types/config';
import { Teardown } from './types/teardown';

export async function setupData(config: Config): Promise<Teardown> {
  const database = await setupDB(config.url);
  const storage = await setupStorage(config.storage);
  return async () => await teardown(database, storage);
}

async function teardown(database: Teardown, storage: Teardown): Promise<void> {
  await database();
  await storage();
}
