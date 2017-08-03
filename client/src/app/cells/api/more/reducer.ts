import { SubscribeMoreCellAPIAction, SubscribeMoreCellAPIActions } from './actions';
import { IMoreCell, CellType } from '../../model';
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';

const INITIAL_STATE: IMoreCell = {
  item: {},
  loading: false,
  error: null,
};

// A higher-order reducer: accepts an cell type and returns a reducer
// that only responds to actions for that particular cell type.
export function createSubscribeMoreCellAPIReducer(cellType: CellType) {
  return function subscribeMoreCellReducer(state: IMoreCell = INITIAL_STATE,
    a: Action): IMoreCell {

    const action = a as SubscribeMoreCellAPIAction;
    if (!action.meta || action.meta.cellType !== cellType) {
      return state;
    }
    
    switch (action.type) {
      case SubscribeMoreCellAPIActions.LOAD_STARTED:
        return {
          ...state,
          item: {},
          loading: true,
          error: null,
        };
      case SubscribeMoreCellAPIActions.LOAD_SUCCEEDED:
        return {
          ...state,
          item: action.payload,
          loading: false,
          error: null,
        };
      case SubscribeMoreCellAPIActions.LOAD_FAILED:
        return {
          ...state,
          item: {},
          loading: false,
          error: action.error,
        };
    }

    return state;
  };
}
