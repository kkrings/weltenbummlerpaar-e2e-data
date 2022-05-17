import { Document, ObjectId } from 'mongodb';
import { ImageDto } from '../types/image.dto';
import { asDocument } from './insert-images';

describe('insert-images', () => {
  let imageDto: ImageDto;
  let imageDoc: Document;

  beforeEach(() => {
    imageDto = {
      id: '6283b4c229215750b89f6147',
      description: 'some description',
      diaryEntryId: '6283b4e7a40b6a1359d78838',
      createdAt: new Date(2020, 2, 14).toISOString(),
      updatedAt: new Date(2020, 2, 14).toISOString(),
    };
  });

  beforeEach(() => {
    imageDoc = {
      _id: ObjectId.createFromHexString('6283b4c229215750b89f6147'),
      description: 'some description',
      diaryEntryId: ObjectId.createFromHexString('6283b4e7a40b6a1359d78838'),
      createdAt: new Date(2020, 2, 14),
      updatedAt: new Date(2020, 2, 14),
    };
  });

  it('#asDocument should perform the correct conversion', () => {
    expect(asDocument(imageDto)).toEqual(imageDoc);
  });
});
