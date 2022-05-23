import { DiaryEntryDto } from '../types/diary-entry.dto';
import { ImageDto } from '../types/image.dto';
import { getDiaryEntries } from './get-diary-entries';

describe('get-diary-entries', () => {
  let diaryEntries: DiaryEntryDto[];

  beforeEach(() => {
    diaryEntries = getDiaryEntries();
  });

  describe("diary entries' IDs", () => {
    let diaryEntryIds: Set<string>;

    beforeEach(() => {
      diaryEntryIds = new Set(diaryEntries.map((entry) => entry.id));
    });

    it('should be unique', () => {
      expect(diaryEntryIds.size).toEqual(diaryEntries.length);
    });
  });

  describe('#diaryEntries[1].images[0]', () => {
    let diaryEntry: DiaryEntryDto;
    let image: ImageDto;

    beforeEach(() => {
      diaryEntry = diaryEntries[1];
      image = diaryEntry.images[0];
    });

    it("#diaryEntryId should be equal to diary entry's ID", () => {
      expect(image.diaryEntryId).toEqual(diaryEntry.id);
    });

    it('#previewImage should be equal to image', () => {
      expect(diaryEntry.previewImage).toEqual(image);
    });
  });

  describe('#diaryEntries[2].images[0]', () => {
    let diaryEntry: DiaryEntryDto;
    let image: ImageDto;

    beforeEach(() => {
      diaryEntry = diaryEntries[2];
      image = diaryEntry.images[0];
    });

    it("#diaryEntryId should be equal to diary entry's ID", () => {
      expect(image.diaryEntryId).toEqual(diaryEntry.id);
    });

    it('#previewImage should be equal to image', () => {
      expect(diaryEntry.previewImage).toEqual(image);
    });
  });

  describe('#diaryEntries[2].images[1]', () => {
    let diaryEntry: DiaryEntryDto;
    let image: ImageDto;

    beforeEach(() => {
      diaryEntry = diaryEntries[2];
      image = diaryEntry.images[1];
    });

    it("#diaryEntryId should be equal to diary entry's ID", () => {
      expect(image.diaryEntryId).toEqual(diaryEntry.id);
    });
  });
});
