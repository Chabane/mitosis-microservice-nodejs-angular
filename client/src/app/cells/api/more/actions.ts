import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ICell, CellType } from '../../model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = Array<ICell>;
interface MetaData { };
export type NewCellAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class NewCellAPIActions {
  static readonly LOAD_CELLS = 'LOAD_MORE_CELLS';
  static readonly LOAD_STARTED = 'LOAD_MORE_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_MORE_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_MORE_FAILED';

  @dispatch()
  loadCells = (): NewCellAPIAction => ({
    type: NewCellAPIActions.LOAD_CELLS,
    meta: {},
    payload: null,
  });

  loadStarted = (): NewCellAPIAction => ({
    type: NewCellAPIActions.LOAD_STARTED,
    meta: {},
    payload: null,
  })

  loadSucceeded = (payload: Payload): NewCellAPIAction => ({
    type: NewCellAPIActions.LOAD_SUCCEEDED,
    meta: {},
    payload,
  })

  loadFailed = (error): NewCellAPIAction => ({
    type: NewCellAPIActions.LOAD_FAILED,
    meta: {},
    payload: null,
    error,
  })
}
