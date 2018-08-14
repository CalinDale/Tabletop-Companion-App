import { InMemoryDbService } from 'angular-in-memory-web-api';

// This will need improving to aproximate a real database, expect it to change often.

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // fill in with { columnName: value, columnName: value, etc... } when adding rows.
    // also rename dbName
    const dbName = [

    ];
    return {dbName};
  }
}
