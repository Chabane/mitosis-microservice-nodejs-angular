import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ],
      imports: [ RouterTestingModule ],
    }).compileComponents();
  }));

  it(`should have as title 'Welcome to the Mitosis'`, async(() => {
    const fixture = TestBed.createComponent(CellComponent);
    const cell = fixture.debugElement.componentInstance;
    expect(cell.title).toEqual('Welcome to the Mitosis');
  }));
});
