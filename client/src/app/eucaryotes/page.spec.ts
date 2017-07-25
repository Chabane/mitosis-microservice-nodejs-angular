import { TestBed, async } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { Component, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';

import { EucaryotePageComponent } from './page';
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

describe('Eucaryote Page Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EucaryotePageComponent, MockCellListComponent],
      imports: [NgReduxTestingModule],
      providers: [CellAPIActions],
    }).compileComponents();

    MockNgRedux.reset();
  });

  it('should select some eucaryotes from the Redux store', done => {
    const fixture = TestBed.createComponent(EucaryotePageComponent);
    const eucaryotePage = fixture.debugElement.componentInstance;
    const mockStoreSequence = [
      { eucaryote1: { name: 'I am a Eucaryote!', id: 'eucaryote1' } },
      {
        eucaryote1: { name: 'I am a Eucaryote!', id: 'eucaryote1' },
        eucaryote2: { name: 'I am a second Eucaryote!', id: 'eucaryote2' },
      }];

    const expectedSequence = [
      [ { name: 'I am a Eucaryote!', id: 'eucaryote1' } ],
      [
        // Alphanumeric sort by name.
        { name: 'I am a Eucaryote!', id: 'eucaryote1' },
        { name: 'I am a second Eucaryote!', id: 'eucaryote2' },
      ]
    ];

    const itemStub = MockNgRedux.getSelectorStub(['eucaryote', 'items']);
    mockStoreSequence.forEach(value => itemStub.next(value));
    itemStub.complete();

    eucaryotePage.cells$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual(expectedSequence),
        null,
        done);
  });

  it('should know when the cells are loading', done => {
    const fixture = TestBed.createComponent(EucaryotePageComponent);
    const eucaryotePage = fixture.debugElement.componentInstance;

    const eucaryotesLoadingStub = MockNgRedux.getSelectorStub(['eucaryote', 'loading']);
    eucaryotesLoadingStub.next(false);
    eucaryotesLoadingStub.next(true);
    eucaryotesLoadingStub.complete();

    eucaryotePage.loading$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should know when there\'s an error', done => {
    const fixture = TestBed.createComponent(EucaryotePageComponent);
    const eucaryotePage = fixture.debugElement.componentInstance;
    const expectedSequence = [ true ];

    const eucaryotesErrorStub = MockNgRedux.getSelectorStub(['eucaryote', 'error']);
    eucaryotesErrorStub.next(false);
    eucaryotesErrorStub.next(true);
    eucaryotesErrorStub.complete();

    eucaryotePage.error$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should load eucaryotes on creation', () => {
    const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
    const fixture = TestBed.createComponent(EucaryotePageComponent);

    expect(spy).toHaveBeenCalledWith({
      type: CellAPIActions.LOAD_CELLS,
      meta: { cellType: CELL_TYPES.EUCARYOTE },
      payload: null,
    });
  });
});
