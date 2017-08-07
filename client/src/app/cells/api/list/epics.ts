import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concat';

import { IAppState } from '../../../store/model';
import { CellType } from '../../model';
import { GetCellsAPIAction, GetCellsAPIActions } from './actions';
import { GetCellsAPIService } from './service';

const cellsNotAlreadyFetched = (
  cellType: CellType,
  state: IAppState): boolean => !(
    state[cellType] &&
    state[cellType].items &&
    Object.keys(state[cellType].items).length);

const actionIsForCorrectCellType = (cellType: CellType) =>
  (action: GetCellsAPIAction): boolean =>
    action.meta.cellType === cellType;

@Injectable()
export class GetCellsAPIEpics {
  constructor(
    private service: GetCellsAPIService,
    private actions: GetCellsAPIActions,
  ) { }

  public createEpic(cellType: CellType) {
    return createEpicMiddleware(this.createLoadCellEpic(cellType));
  }

  private createLoadCellEpic(cellType: CellType): Epic<GetCellsAPIAction, IAppState> {

    return (action$, store) => action$
      .ofType(GetCellsAPIActions.LOAD_CELLS)
      .filter(action => actionIsForCorrectCellType(cellType)(action))
      .filter(() => cellsNotAlreadyFetched(cellType, store.getState()))
      .switchMap(() => this.service.getAll(cellType)
        .map((response: any) => this.actions.loadSucceeded(cellType, response.data.cellsByType))
        .catch(response => of(this.actions.loadFailed(cellType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(cellType)));
  }
}
