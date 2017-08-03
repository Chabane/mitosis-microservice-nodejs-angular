import { ICellList, IMoreCell } from '../cells/model';

export interface IAppState {
  [cellType: string]: ICellList;
  routes?: any;
  feedback?: any;
}
