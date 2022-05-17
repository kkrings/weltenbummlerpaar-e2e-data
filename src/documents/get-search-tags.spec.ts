import { Document, ObjectId } from 'mongodb';
import { getDiaryEntries } from '../payloads/get-diary-entries';
import { DiaryEntryDto } from '../types/diary-entry.dto';
import { getSearchTags } from './get-search-tags';

describe('get-search-tags', () => {
  let searchTags: Document[];

  beforeEach(() => {
    searchTags = getSearchTags();
  });

  describe("search tags' IDs", () => {
    let searchTagIds: Set<string>;

    beforeEach(() => {
      searchTagIds = new Set(searchTags.map((tag) => tag._id.toHexString()));
    });

    it('should be unique', () => {
      expect(searchTagIds.size).toEqual(searchTags.length);
    });
  });

  describe.each([0, 1, 2])('#searchTags[%i].diaryEntries', (index) => {
    let searchTag: Document;
    let diaryEntryIds: string[];
    let diaryEntries: DiaryEntryDto[];

    beforeEach(() => {
      searchTag = searchTags[index];
    });

    beforeEach(() => {
      diaryEntryIds = searchTag.diaryEntries.map((id: ObjectId) =>
        id.toHexString(),
      );
    });

    beforeEach(() => {
      diaryEntries = getDiaryEntries().filter((entry) =>
        entry.searchTags.includes(searchTag.searchTag),
      );
    });

    it('should contain the correct diary entry IDs', () => {
      expect(diaryEntryIds).toEqual(diaryEntries.map((entry) => entry.id));
    });
  });
});
