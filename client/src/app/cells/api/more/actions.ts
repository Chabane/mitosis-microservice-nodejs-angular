import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ICell, CellType } from '../../model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ICell;
interface MetaData { cellType: CellType; };
export type SubscribeMoreCellAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SubscribeMoreCellAPIActions {
  static readonly SUBSCRIBE_MORE_CELLS = 'SUBSCRIBE_MORE_CELLS';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch()
  subscribeMoreCell = (cellType: CellType): SubscribeMoreCellAPIAction => ({
    type: SubscribeMoreCellAPIActions.SUBSCRIBE_MORE_CELLS,
    meta: { cellType },
    payload: null,
  });

  loadStarted = (cellType: CellType): SubscribeMoreCellAPIAction => ({
    type: SubscribeMoreCellAPIActions.LOAD_STARTED,
    meta: { cellType },
    payload: null,
  })

  loadSucceeded = (cellType: CellType, payload: Payload): SubscribeMoreCellAPIAction => ({
    type: SubscribeMoreCellAPIActions.LOAD_SUCCEEDED,
    meta: { cellType },
    payload,
  })

  loadFailed = (cellType: CellType, error): SubscribeMoreCellAPIAction => ({
    type: SubscribeMoreCellAPIActions.LOAD_FAILED,
    meta: { cellType },
    payload: null,
    error,
  })
}
