export const CELL_TYPES = {
  EUCARYOTE: 'eucaryote',
  PROCARYOTE: 'procaryote',
};

// TODO: is there a way to improve this?
export type CellType = string;

export interface ICell {
  id: string;
  cellType: CellType;
  name: string;
  ticketPrice: number;
  tickets: number;
}

export interface ICellList {
  items: {};
  loading: boolean;
  error: any;
}

export const fromServer = (record: any): ICell => ({
  id: record.name.toLowerCase(),
  cellType: record.cellType,
  name: record.name,
  ticketPrice: record.ticketPrice || 0,
  tickets: record.tickets || 0,
});
