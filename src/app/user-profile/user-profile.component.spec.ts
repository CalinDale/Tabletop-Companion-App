import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { TrackerComponent } from './../tracker/tracker.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AuthService } from './../core/auth.service';
import { UserProfileComponent } from './user-profile.component';
import { FormBuilder } from '../../../node_modules/@angular/forms';

describe('UserProfileComponent', () => {
  let testAuth: AuthService;
  let testFB: FormBuilder;
  let component: UserProfileComponent;
  beforeEach(() => {
    testAuth = jasmine.createSpyObj('testAuth', [
      'needsomethinghere'
    ]);
    testFB = jasmine.createSpyObj('testFB', [
      'needsomethinghere'
    ]);
    component = new UserProfileComponent(testAuth, testFB);
  });
  afterEach(() => {
    testAuth = null;
    testFB = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
