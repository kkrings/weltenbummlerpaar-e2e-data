import { Document, ObjectId } from 'mongodb';
import { DiaryEntryDto } from './types/diary-entry.dto';

export const asMongoId = (id?: string): ObjectId | null =>
  id ? ObjectId.createFromHexString(id) : null;

export function removeOptional(document: Document): Document {
  const result: Document = {};

  for (const property in document) {
    if (document[property]) {
      result[property] = document[property];
    }
  }

  return result;
}

export function setPreviewImage(diaryEntry: DiaryEntryDto): DiaryEntryDto {
  if (!diaryEntry.previewImage && diaryEntry.images) {
    diaryEntry.previewImage = diaryEntry.images[0];
  }

  return diaryEntry;
}
