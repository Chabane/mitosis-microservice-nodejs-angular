import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ICell, CellType } from '../../model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = Array<ICell>;
interface MetaData { cellType: CellType; };
export type GetCellsAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class GetCellsAPIActions {
  static readonly LOAD_CELLS = 'LOAD_CELLS';
  static readonly SUBSCRIBE_MORE_CELLS = 'SUBSCRIBE_MORE_CELLS';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch()
  loadCells = (cellType: CellType): GetCellsAPIAction => ({
    type: GetCellsAPIActions.LOAD_CELLS,
    meta: { cellType },
    payload: null,
  });

  loadStarted = (cellType: CellType): GetCellsAPIAction => ({
    type: GetCellsAPIActions.LOAD_STARTED,
    meta: { cellType },
    payload: null,
  })

  loadSucceeded = (cellType: CellType, payload: Payload): GetCellsAPIAction => ({
    type: GetCellsAPIActions.LOAD_SUCCEEDED,
    meta: { cellType },
    payload,
  })

  loadFailed = (cellType: CellType, error): GetCellsAPIAction => ({
    type: GetCellsAPIActions.LOAD_FAILED,
    meta: { cellType },
    payload: null,
    error,
  })
}
