import { ImageDto } from '../types/image.dto';
import { getDiaryEntries } from './get-diary-entries';

export const getImages = (): ImageDto[] =>
  getDiaryEntries()
    .map((diaryEntry) => diaryEntry.images)
    .flat();
