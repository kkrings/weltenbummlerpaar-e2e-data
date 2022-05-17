import { Document, ObjectId } from 'mongodb';
import { DiaryEntryDto } from '../types/diary-entry.dto';
import { ImageDto } from '../types/image.dto';
import { asDocument } from './insert-diary-entries';

describe('insert-diary-entries', () => {
  let imageDto: ImageDto;
  let baseDiaryEntryDto: DiaryEntryDto;
  let baseDiaryEntryDoc: Document;

  beforeEach(() => {
    imageDto = {
      id: '6283b7597f10ee4d2e0cf4fa',
      description: 'some description',
      diaryEntryId: '6283b71b0569df42d5985f6a',
      createdAt: new Date(2020, 2, 14).toISOString(),
      updatedAt: new Date(2020, 2, 14).toISOString(),
    };
  });

  beforeEach(() => {
    baseDiaryEntryDto = {
      id: '6283b71b0569df42d5985f6a',
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some search tag'],
      images: [imageDto],
      createdAt: new Date(2020, 2, 14).toISOString(),
      updatedAt: new Date(2020, 2, 14).toISOString(),
    };
  });

  beforeEach(() => {
    baseDiaryEntryDoc = {
      _id: ObjectId.createFromHexString('6283b71b0569df42d5985f6a'),
      title: 'some title',
      location: 'some location',
      body: 'some body',
      searchTags: ['some search tag'],
      images: [ObjectId.createFromHexString(imageDto.id)],
      createdAt: new Date(2020, 2, 14),
      updatedAt: new Date(2020, 2, 14),
    };
  });

  describe('base diary entry', () => {
    it('#asDocument should perform the correct conversion', () => {
      expect(asDocument(baseDiaryEntryDto)).toEqual(baseDiaryEntryDoc);
    });
  });

  describe('with #previewImage', () => {
    let diaryEntryDto: DiaryEntryDto;
    let diaryEntryDoc: Document;

    beforeEach(() => {
      diaryEntryDto = {
        ...baseDiaryEntryDto,
        previewImage: imageDto,
      };
    });

    beforeEach(() => {
      diaryEntryDoc = {
        ...baseDiaryEntryDoc,
        previewImage: ObjectId.createFromHexString(imageDto.id),
      };
    });

    it('#asDocument should perform the correct conversion', () => {
      expect(asDocument(diaryEntryDto)).toEqual(diaryEntryDoc);
    });
  });

  describe('with #dateRange', () => {
    let diaryEntryDto: DiaryEntryDto;
    let diaryEntryDoc: Document;

    beforeEach(() => {
      diaryEntryDto = {
        ...baseDiaryEntryDto,
        dateRange: {
          dateMin: new Date(2020, 2, 13).toISOString(),
          dateMax: new Date(2020, 2, 14).toISOString(),
        },
      };
    });

    beforeEach(() => {
      diaryEntryDoc = {
        ...baseDiaryEntryDoc,
        dateRange: {
          dateMin: new Date(2020, 2, 13),
          dateMax: new Date(2020, 2, 14),
        },
      };
    });

    it('#asDocument should perform the correct conversion', () => {
      expect(asDocument(diaryEntryDto)).toEqual(diaryEntryDoc);
    });
  });
});
