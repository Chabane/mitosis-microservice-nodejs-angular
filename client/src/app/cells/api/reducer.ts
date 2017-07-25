import { CellAPIAction, CellAPIActions } from './actions';
import { ICellList, CellType } from '../model';
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';

const INITIAL_STATE: ICellList = {
  items: {},
  loading: false,
  error: null,
};

// A higher-order reducer: accepts an cell type and returns a reducer
// that only responds to actions for that particular cell type.
export function createCellAPIReducer(cellType: CellType) {
  return function cellReducer(state: ICellList = INITIAL_STATE,
    a: Action): ICellList {

    const action = a as CellAPIAction;
    if (!action.meta || action.meta.cellType !== cellType) {
      return state;
    }

    switch (action.type) {
      case CellAPIActions.LOAD_STARTED:
        return {
          ...state,
          items: {},
          loading: true,
          error: null,
        };
      case CellAPIActions.LOAD_SUCCEEDED:
        return {
          ...state,
          items: indexBy(prop('id'), action.payload),
          loading: false,
          error: null,
        };
      case CellAPIActions.LOAD_FAILED:
        return {
          ...state,
          items: {},
          loading: false,
          error: action.error,
        };
    }

    return state;
  };
}
