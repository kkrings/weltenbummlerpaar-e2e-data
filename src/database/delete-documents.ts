import { Db } from 'mongodb';

export async function deleteDocuments(database: Db): Promise<void> {
  await database.collection('diaryentries').deleteMany({});
  await database.collection('searchtags').deleteMany({});
  await database.collection('images').deleteMany({});
}
