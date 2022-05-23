import { DiaryEntryDto } from '../types/diary-entry.dto';
import { ImageDto } from '../types/image.dto';
import { getDiaryEntries } from './get-diary-entries';
import { getImages } from './get-images';

describe('get-images', () => {
  let images: ImageDto[];

  beforeEach(() => {
    images = getImages();
  });

  describe("images' IDs", () => {
    let imageIds: Set<string>;

    beforeEach(() => {
      imageIds = new Set(images.map((image) => image.id));
    });

    it('should be unique', () => {
      expect(imageIds.size).toEqual(images.length);
    });
  });

  describe('#images', () => {
    let diaryEntries: DiaryEntryDto[];

    beforeEach(() => {
      diaryEntries = getDiaryEntries();
    });

    it("should be equal to diary entries' images", () => {
      expect(images).toEqual([
        ...diaryEntries[0].images,
        ...diaryEntries[1].images,
        ...diaryEntries[2].images,
      ]);
    });
  });
});
