import { DateRangeDto } from './date-range.dto';
import { ImageDto } from './image.dto';

export interface DiaryEntryDto {
  id: string;
  title: string;
  location: string;
  dateRange?: DateRangeDto;
  body: string;
  searchTags: string[];
  previewImage?: ImageDto;
  images: ImageDto[];
  createdAt: string;
  updatedAt: string;
}
