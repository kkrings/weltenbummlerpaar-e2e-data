import { Db, Document } from 'mongodb';
import { getImages } from '../payloads/get-images';
import { ImageDto } from '../types/image.dto';
import { asMongoId } from '../utils';

export async function insertImages(database: Db): Promise<void> {
  const collection = database.collection('images');
  const documents = getImages().map((image) => asDocument(image));
  await collection.insertMany(documents);
}

const asDocument = (image: ImageDto): Document => ({
  _id: asMongoId(image.id),
  description: image.description,
  diaryEntryId: asMongoId(image.diaryEntryId),
  createdAt: new Date(image.createdAt),
  updatedAt: new Date(image.updatedAt),
});
