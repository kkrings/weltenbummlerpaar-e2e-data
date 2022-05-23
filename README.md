# Weltenbummlerpaar E2E Data

This is a [Node] package for filling data for E2E testing into [MongoDB]. It is
part of the _Weltenbummlerpaar_ travel diary web application. It used for the
E2E tests of both the [Angular]-based [frontend] and the [Nest]-based [backend].

[node]: https://nodejs.org/
[mongodb]: https://www.mongodb.com/
[angular]: https://angular.io/
[nest]: https://nestjs.com/
[frontend]: https://github.com/kkrings/weltenbummlerpaar
[backend]: https://github.com/kkrings/weltenbummlerpaar-backend

# Usage

The package provides the function `setupData`. It takes care of filling the data
into the database, and of copying the corresponding image files. It should be
called e.g. inside of a `beforeEach` hook:

```typescript
import {
  getDiaryEtries,
  getImages,
  setupData,
  DiaryEntryDto,
  ImageDto,
  Teardown,
} from '@kkrings/weltenbummlerpaar-e2-data';

describe('some E2E test', () => {
  let teardownData: Teardown;
  let diaryEntries: DiaryEntryDto[];
  let images: ImageDto[];

  beforeEach(async () => {
    teardownData = await setupData({
      url: 'some MongoDB URL',
      storage: 'path to image upload directory'
    });
  });

  beforeEach(() => {
    diaryEntries = getDiaryEntries();
    images = getImages();
  });

  // here go the test cases

  afterEach(async () => {
    await teardownData();
  });
});
```

It returns a function of type `Teardown`. If this function is called, all
created documents are deleted, the connection to the database is closed, and the
storage is cleared. This should usually happen e.g. inside of a `afterEach`
hook.

The diary entries and images that are filled into the database can be obtained
from the function `getDiaryEntries` and `getImages`. They are returned as they
would have been sent from the backend server.
