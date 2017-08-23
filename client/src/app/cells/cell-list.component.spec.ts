import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CellListComponent } from './cell-list.component';

describe('CellListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellListComponent ],
      imports: [ RouterTestingModule ],
    }).compileComponents();
  }));

  it(`should have as title 'Welcome to the Mitosis'`, async(() => {
    const fixture = TestBed.createComponent(CellListComponent);
    const cellList = fixture.debugElement.componentInstance;
    expect(cellList.title).toEqual('Welcome to the Mitosis');
  }));
});
