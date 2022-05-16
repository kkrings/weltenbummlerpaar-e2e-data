import { Db } from 'mongodb';
import { getSearchTags } from '../documents/get-search-tags';

export async function insertSearchTags(database: Db): Promise<void> {
  const collection = database.collection('searchtags');
  await collection.insertMany(getSearchTags());
}
