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

The package provides the `setupDB` function, which takes care of filling the
data into the database. It expects a connection string, and it should be called
e.g. inside of a `beforeEach` hook:

```typescript
import {
  getDiaryEtries,
  getImages,
  setupDB,
  DiaryEntryDto,
  ImageDto,
  TeardownDB,
} from '@kkrings/weltenbummlerpaar-e2-data';

describe('some E2E test', () => {
  let teardownDB: TeardownDB;
  let diaryEntries: DiaryEntryDto[];
  let images: ImageDto[];

  beforeEach(async () => {
    teardownDB = await setupDB('some MongoDB URL');
  });

  beforeEach(() => {
    diaryEntries = getDiaryEntries();
    images = getImages();
  });

  // here go the test cases

  afterEach(async () => {
    await teardownDB();
  });
});
```

It the returns a function of type `TeardownDB`. If this function is called, all
created documents are deleted, and the connection to it is closed. This should
usually happen e.g. inside of a `afterEach` hook.

The diary entries and images that are filled into the database can be obtained
from the function `getDiaryEntries` and `getImages`. They are returned as they
would have been sent from the backend server.
