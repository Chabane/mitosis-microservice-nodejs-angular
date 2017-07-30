import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import { IAppState } from '../../store/model';
import { CellType } from '../model';
import { CellAPIAction, CellAPIActions } from './actions';
import { CellAPIService } from './service';

const cellsNotAlreadyFetched = (
  cellType: CellType,
  state: IAppState): boolean => !(
    state[cellType] &&
    state[cellType].items &&
    Object.keys(state[cellType].items).length);

const actionIsForCorrectCellType = (cellType: CellType) =>
  (action: CellAPIAction): boolean =>
    action.meta.cellType === cellType;

@Injectable()
export class CellAPIEpics {
  constructor(
    private service: CellAPIService,
    private actions: CellAPIActions,
  ) { }

  public createEpic(cellType: CellType) {
    return createEpicMiddleware(this.createLoadCellEpic(cellType));
  }

  private createLoadCellEpic(cellType: CellType): Epic<CellAPIAction, IAppState> {
    return (action$, store) => action$
      .ofType(CellAPIActions.LOAD_CELLS)
      .filter(action => actionIsForCorrectCellType(cellType)(action))
      .filter(() => cellsNotAlreadyFetched(cellType, store.getState()))
      .switchMap(() => this.service.getAll(cellType)
        .map(response => this.actions.loadSucceeded(cellType, (<any>response.data).cellsByType))
        .catch(response => of(this.actions.loadFailed(cellType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(cellType)));
  }
}
