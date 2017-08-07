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
import { NewCellAPIAction, NewCellAPIActions } from './actions';
import { NewCellAPIService } from './service';

@Injectable()
export class NewCellAPIEpics {
  constructor(
    private service: NewCellAPIService,
    private actions: NewCellAPIActions,
  ) { }

  public createEpic() {
    return createEpicMiddleware(this.createLoadNewCellEpic());
  }

  private createLoadNewCellEpic(): Epic<NewCellAPIAction, IAppState> {

    return (action$, store) => action$
      .ofType(NewCellAPIActions.LOAD_CELLS)
      .switchMap(() => this.service.getNewCell()
        .map((response: any) => this.actions.loadSucceeded(response.data.cellsByType))
        .catch(response => of(this.actions.loadFailed({
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted()));
  }
}
