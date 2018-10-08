import { NavigationTableComponent } from './navigation-table.component';
import { Location, LocationStrategy, PathLocationStrategy } from '../../../node_modules/@angular/common';


describe('NavigationTableComponent', () => {
  let testLocation: Location;
  let testPath: String;
  let component: NavigationTableComponent;

  beforeEach(() => {
    testPath = '/';
    testLocation = jasmine.createSpyObj('testLocation', [
      'path'
    ]);

    (<jasmine.Spy>(testLocation.path)).and.returnValue(testPath);

    component = new NavigationTableComponent( testLocation );
  });

  afterEach(() => {
    testPath = null;
    testLocation = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'selectOnOpen');
    });
    afterEach(() => { });
    it('should call selectOnOpen()', () => {
      component.ngOnInit();
      expect(component.selectOnOpen).toHaveBeenCalled();
    });
  });

  describe('select()', () => {
    let testEventClassList: DOMTokenList;
    let testEvent: Event;

    let testElementClassList: DOMTokenList;
    let testElements: HTMLCollectionOf<Element>;
    let testDocument: Document;

    beforeEach(() => {
      testEventClassList = jasmine.createSpyObj('testEventClassList', [
        'add'
      ]);
      testEvent = <any>{ currentTarget: { classList: testEventClassList } };

      testElementClassList = jasmine.createSpyObj('testElementClassList', [
        'remove'
      ]);
      testElements = <any>[ { classList: testElementClassList } ];
      testDocument = jasmine.createSpyObj('testDocument', [
        'getElementsByClassName'
      ]);

      // document is private it seems, not sure how to test.
      // component.document = testDocument;
      (<jasmine.Spy>(testDocument.getElementsByClassName)).and.returnValue(testElements);
    });
    afterEach(() => {
      testEventClassList = null;
      testEvent = null;
      testElementClassList = null;
      testElements = null;
      testDocument = null;
    });
    // TODO: See above.
    // it('should call remove("selected") for each element gotten from the document', () => {
    //   component.select(testEvent);
    //   expect(testElementClassList.remove).toHaveBeenCalledWith('remove');
    //   expect(testElementClassList.remove).toHaveBeenCalledTimes(testElements.length);
    // });
  });
});
