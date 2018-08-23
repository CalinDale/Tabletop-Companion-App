import { InMemoryDbService } from 'angular-in-memory-web-api';

// This will need improving to aproximate a real database, expect it to change often.

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // fill in with { columnName: value, columnName: value, etc... } when adding rows.
    // also rename dbName


    const characters = [
      { charId: 0, name: 'Monopoly: Bill', attributes: [
        { name: 'money', type: 'number', value: '1,000'}
      ]},
      { charId: 1, name: 'Dnd: Jane', attributes: [
        { name: 'health', type: 'fraction', value: '5/8'},
        { name: 'armor', type: 'number', value: '15'}
      ]},
      { charId: 2, name: 'Munchkin: Dave', attributes: [
        { name: 'level', type: 'number', value: '3'},
        { name: 'race and class', type: 'string', value: 'Dwarf Wizard'},
        { name: 'combat strength', type: 'number', value: '5'}
      ]}
    ];
    return { characters };
  }
}
