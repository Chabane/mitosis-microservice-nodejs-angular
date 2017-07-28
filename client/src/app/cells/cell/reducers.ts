import { Reducer, Action } from 'redux';
import { CellComponent } from './component';

export const sizeReducer: Reducer<number> = (state = 0, action: Action): number => {
  switch (action.type) {
    case CellComponent.ADD_SIZE: return state + 1;
    case CellComponent.REMOVE_SIZE: return Math.max(0, state - 1);
  }
  return state;
}

// Basic reducer logic.
export const cellComponentReducer: Reducer<any> = (state: any = {}, action: Action): {} => ({
  ...state,
  size: sizeReducer(state.size, action),
});
