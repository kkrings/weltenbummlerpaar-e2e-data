import { Db, Document } from 'mongodb';
import { _getDiaryEntries } from '../payloads/get-diary-entries';
import { DateRangeDto } from '../types/date-range.dto';
import { DiaryEntryDto } from '../types/diary-entry.dto';
import { asMongoId, removeOptional } from '../utils';

export async function insertDiaryEntries(database: Db): Promise<void> {
  const collection = database.collection('diaryentries');
  const documents = _getDiaryEntries().map((entry) => asDocument(entry));
  await collection.insertMany(documents);
}

const asDocument = (diaryEntry: DiaryEntryDto): Document =>
  removeOptional(_asDocument(diaryEntry));

const _asDocument = (diaryEntry: DiaryEntryDto): Document => ({
  _id: asMongoId(diaryEntry.id),
  title: diaryEntry.title,
  location: diaryEntry.location,
  dateRange: asDateRange(diaryEntry.dateRange),
  body: diaryEntry.body,
  searchTags: diaryEntry.searchTags,
  previewImage: asMongoId(diaryEntry.previewImage?.id),
  images: diaryEntry.images.map((image) => asMongoId(image.id)),
  createdAt: new Date(diaryEntry.createdAt),
  updatedAt: new Date(diaryEntry.updatedAt),
});

const asDateRange = (dateRange?: DateRangeDto): Document | null =>
  !dateRange ? null : _asDateRange(dateRange);

const _asDateRange = (dateRange: DateRangeDto): Document => ({
  dateMin: new Date(dateRange.dateMin),
  dateMax: new Date(dateRange.dateMax),
});
