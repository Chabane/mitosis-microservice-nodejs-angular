import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { pipe, values, sortBy, prop } from 'ramda';
import { Observable } from 'rxjs/Observable';

import { CellAPIActions } from '../cells/api/actions';
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
export class ProcaryotePageComponent {
  // Get procaryote-related data out of the Redux store as observables.
  @select$(['procaryote', 'items'], sortCells)
  readonly cells$: Observable<ICell[]>;

  @select(['procaryote', 'loading'])
  readonly loading$: Observable<boolean>;

  @select(['procaryote', 'error'])
  readonly error$: Observable<any>;

  constructor(actions: CellAPIActions) {
    actions.loadCells(CELL_TYPES.PROCARYOTE);
  }
}
