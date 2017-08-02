export const CELL_TYPES = {
  EUCARYOTE: 'EUCARYOTE',
  PROCARYOTE: 'PROCARYOTE',
};

// TODO: is there a way to improve this?
export type CellType = string;

export interface ICell {
  id: string;
  type: CellType;
  name: string;
  color: string;
  size: number;
}

export interface ICellList {
  items: {};
  loading: boolean;
  error: any;
}

export interface IMoreCell {
  item: {};
  loading: boolean;
  error: any;
}

export const fromServer = (record: any): ICell => ({
  id: record.name.toLowerCase(),
  type: record.cellType,
  name: record.name,
  color: record.color || 0,
  size: record.size || 0,
});
