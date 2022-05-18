import { MongoClient } from 'mongodb';
import { insertDiaryEntries } from './insert-diary-entries';
import { insertImages } from './insert-images';
import { insertSearchTags } from './insert-search-tags';

export async function setupDB(url: string): Promise<TeardownDB> {
  const connection = await MongoClient.connect(url);

  const database = connection.db();
  await insertDiaryEntries(database);
  await insertSearchTags(database);
  await insertImages(database);

  return async () => await teardownDB(connection);
}

async function teardownDB(connection: MongoClient): Promise<void> {
  const database = connection.db();
  await database.dropCollection('diaryentries');
  await database.dropCollection('searchtags');
  await database.dropCollection('images');
  await connection.close();
}

export type TeardownDB = () => ReturnType<typeof teardownDB>;
