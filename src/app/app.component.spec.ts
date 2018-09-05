import { MessagesComponent } from './messages/messages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// TODO: Isolate these tests.

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MessagesComponent
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Tabletop-Companion-App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tabletop-Companion-App');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Tabletop-Companion-App');
  }));
});
