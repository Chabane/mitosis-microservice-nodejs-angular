import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import { IAppState } from '../../../store/model';
import { CellType, ICell } from '../../model';
import { SubscribeMoreCellsAPIAction, SubscribeMoreCellsAPIActions } from './actions';
import { SubscribeMoreCellsAPIService } from './service';

const actionIsForCorrectCellType = (cellType: CellType) =>
  (action: SubscribeMoreCellsAPIAction): boolean =>
    action.meta.cellType === cellType;

@Injectable()
export class SubscribeMoreCellsAPIEpics {
  constructor(
    private service: SubscribeMoreCellsAPIService,
    private actions: SubscribeMoreCellsAPIActions,
  ) { }

  public createEpic(cellType: CellType) {
    return createEpicMiddleware(this.createSubscribeMoreCellsEpic(cellType));
  }

  private createSubscribeMoreCellsEpic(cellType: CellType): Epic<SubscribeMoreCellsAPIAction, IAppState> {
    return (action$, store) => action$
      .ofType(SubscribeMoreCellsAPIActions.SUBSCRIBE_MORE_CELLS)
      .filter(action => actionIsForCorrectCellType(cellType)(action))
      .switchMap(() => this.service.getNewCell(cellType)
        .map((response: any) => this.actions.loadSucceeded(cellType, response.newCell))
        .catch(response => of(this.actions.loadFailed(cellType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(cellType)));
  }
}
