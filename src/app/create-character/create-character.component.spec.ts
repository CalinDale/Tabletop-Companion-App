import { CharacterService } from '../character.service';
import { CreateCharacterComponent } from './create-character.component';

describe('CreateCharacterComponent', () => {
  let testCharacterService: CharacterService;
  let component: CreateCharacterComponent;
  beforeEach(() => {
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'createCharacter'
    ]);
    component = new CreateCharacterComponent(testCharacterService);
  });
  afterEach(() => {
    testCharacterService = null;
    component = null;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
