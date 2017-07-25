import { TestBed, async } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { Component, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';

import { ProcaryotePageComponent } from './page';
import { CellAPIActions } from '../cells/api/actions';
import { CELL_TYPES } from '../cells/model';

@Component({
  selector: 'mi-cell-list',
  template: 'Mock Cell List',
})
class MockCellListComponent {
  @Input() cellsName: string;
  @Input() cells: Observable<any>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;
};

describe('Procaryote Page Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcaryotePageComponent, MockCellListComponent],
      imports: [NgReduxTestingModule],
      providers: [CellAPIActions],
    }).compileComponents();

    MockNgRedux.reset();
  });

  it('should select some procaryotes from the Redux store', done => {
    const fixture = TestBed.createComponent(ProcaryotePageComponent);
    const procaryotePage = fixture.debugElement.componentInstance;
    const mockStoreSequence = [
      { procaryote1: { name: 'I am an Procaryote!', id: 'procaryote1' } },
      {
        procaryote1: { name: 'I am an Procaryote!', id: 'procaryote1' },
        procaryote2: { name: 'I am a second Procaryote!', id: 'procaryote2' },
      }];

    const expectedSequence = [
      [ { name: 'I am an Procaryote!', id: 'procaryote1' } ],
      [
        // Alphanumeric sort by name.
        { name: 'I am a second Procaryote!', id: 'procaryote2' },
        { name: 'I am an Procaryote!', id: 'procaryote1' },
      ]
    ];

    const procaryoteItemStub = MockNgRedux.getSelectorStub(['procaryote', 'items']);
    mockStoreSequence.forEach(value => procaryoteItemStub.next(value));
    procaryoteItemStub.complete();

    procaryotePage.cells$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual(expectedSequence),
        null,
        done);
  });

  it('should know when the cells are loading', done => {
    const fixture = TestBed.createComponent(ProcaryotePageComponent);
    const procaryotePage = fixture.debugElement.componentInstance;

    const stub = MockNgRedux.getSelectorStub(['procaryote', 'loading']);
    stub.next(false);
    stub.next(true);
    stub.complete();

    procaryotePage.loading$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should know when there\'s an error', done => {
    const fixture = TestBed.createComponent(ProcaryotePageComponent);
    const procaryotePage = fixture.debugElement.componentInstance;

    const stub = MockNgRedux.getSelectorStub(['procaryote', 'error']);
    stub.next(false);
    stub.next(true);
    stub.complete();

    procaryotePage.error$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should load procaryotes on creation', () => {
    const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
    const fixture = TestBed.createComponent(ProcaryotePageComponent);

    expect(spy).toHaveBeenCalledWith({
      type: CellAPIActions.LOAD_CELLS,
      meta: { cellType: CELL_TYPES.PROCARYOTE },
      payload: null,
    });
  });
});
