import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { createCellAPIReducer } from '../cells/api/reducer';
import { CELL_TYPES } from '../cells/model';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    procaryote: createCellAPIReducer(CELL_TYPES.PROCARYOTE),
    eucaryote: createCellAPIReducer(CELL_TYPES.EUCARYOTE),
    router: routerReducer,
  }));
