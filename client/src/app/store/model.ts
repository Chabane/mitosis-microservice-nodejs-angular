import { ICellList } from '../cells/model';

export interface IAppState {
  [cellType: string]: ICellList;
  more?:any;
  routes?: any;
  feedback?: any;
}
