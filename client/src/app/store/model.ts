import { ICellList, IMoreCell } from '../cells/model';

export interface IAppState {
  [cellType: string]: ICellList;
  moreCell?:any;
  routes?: any;
  feedback?: any;
}
