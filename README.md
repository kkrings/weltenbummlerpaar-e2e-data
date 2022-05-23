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

The package provides the functions `setupDB` and `setupStorage`, respectively.
The former takes care of filling the data into the database. It expects a
connection string. The latter copies the corresponding image files into the
given directory for image uploads. Both functions should be called e.g. inside
of a `beforeEach` hook:

```typescript
import {
  getDiaryEtries,
  getImages,
  setupDB,
  setupStorage,
  DiaryEntryDto,
  ImageDto,
  TeardownDB,
  TeardownStorage,
} from '@kkrings/weltenbummlerpaar-e2-data';

describe('some E2E test', () => {
  let teardownDB: TeardownDB;
  let teardownStorage: TeardownStorage;
  let diaryEntries: DiaryEntryDto[];
  let images: ImageDto[];

  beforeEach(async () => {
    teardownDB = await setupDB('some MongoDB URL');
    teardownStorage = await setupStorage('path to image upload directory');
  });

  beforeEach(() => {
    diaryEntries = getDiaryEntries();
    images = getImages();
  });

  // here go the test cases

  afterEach(async () => {
    await teardownDB();
    await teardownStorage();
  });
});
```

They return functions of type `TeardownDB` and `TeardownStorage`, respectively.
If these functions are called, all created documents are deleted, the connection
to the database is closed, and the image upload directory is cleared. This
should usually happen e.g. inside of a `afterEach` hook.

The diary entries and images that are filled into the database can be obtained
from the function `getDiaryEntries` and `getImages`. They are returned as they
would have been sent from the backend server.
