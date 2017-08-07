import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { createGetCellsAPIReducer } from '../cells/api/list/reducer';
import { createNewCellAPIReducer } from '../cells/api/more/reducer';
import { CELL_TYPES } from '../cells/model';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    procaryote: createGetCellsAPIReducer(CELL_TYPES.PROCARYOTE),
    eucaryote: createGetCellsAPIReducer(CELL_TYPES.EUCARYOTE),
    more: createNewCellAPIReducer(),
    router: routerReducer,
  }));
