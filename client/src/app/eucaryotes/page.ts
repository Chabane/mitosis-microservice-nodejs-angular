import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { pipe, values, sortBy, prop } from 'ramda';

import { GetCellsAPIActions } from '../cells/api/list/actions';
import { SubscribeMoreCellsAPIActions } from '../cells/api/more/actions';
import { CELL_TYPES, ICell } from '../cells/model';

export const sortCells = (cellDictionary$: Observable<{}>) =>
  cellDictionary$.map(
    pipe(
      values,
      sortBy(prop('name'))));

@Component({
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EucaryotePageComponent {
  // Get eucaryote-related data out of the Redux store as observables.
  @select$(['eucaryote', 'items'], sortCells)
  readonly cells$: Observable<Array<ICell>>;

  // Get eucaryote-related data out of the Redux store as observables.
  @select(['more_eucaryote', 'item'])
  readonly cell$: Observable<ICell>;

  @select(['eucaryote', 'more_eucaryote', 'loading'])
  readonly loading$: Observable<boolean>;

  @select(['eucaryote', 'more_eucaryote', 'error'])
  readonly error$: Observable<any>;

  constructor(getCellsAPIActions: GetCellsAPIActions,
    subscribeMoreCellsAPIActions: SubscribeMoreCellsAPIActions) {
    getCellsAPIActions.loadCells(CELL_TYPES.EUCARYOTE);
    subscribeMoreCellsAPIActions.subscribeMoreCells(CELL_TYPES.EUCARYOTE);
  }
}
