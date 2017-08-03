import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import { IAppState } from '../../../store/model';
import { CellType, ICell } from '../../model';
import { SubscribeMoreCellAPIAction, SubscribeMoreCellAPIActions } from './actions';
import { SubscribeMoreCellAPIService } from './service';

const actionIsForCorrectCellType = (cellType: CellType) =>
  (action: SubscribeMoreCellAPIAction): boolean =>
    action.meta.cellType === cellType;

@Injectable()
export class SubscribeMoreCellAPIEpics {
  constructor(
    private service: SubscribeMoreCellAPIService,
    private actions: SubscribeMoreCellAPIActions,
  ) { }

  public createEpic(cellType: CellType) {
    return createEpicMiddleware(this.createSubscribeMoreCellEpic(cellType));
  }

  private createSubscribeMoreCellEpic(cellType: CellType): Epic<SubscribeMoreCellAPIAction, IAppState> {
    return (action$) => action$
      .ofType(SubscribeMoreCellAPIActions.SUBSCRIBE_MORE_CELLS)
      .filter(action => actionIsForCorrectCellType(cellType)(action))
      .switchMap(() => this.service.getNewCell(cellType)
        .map((response: any) => this.actions.loadSucceeded(cellType, response.newCell))
        .catch(response => of(this.actions.loadFailed(cellType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(cellType)));
  }
}
