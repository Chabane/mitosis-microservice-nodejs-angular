export const CELL_TYPES = {
  EUCARYOTE: 'EUCARYOTE',
  PROCARYOTE: 'PROCARYOTE'
};

// TODO: is there a way to improve this?
export type CellType = string;

export interface ICell {
  id: string;
  type: CellType;
  name: string;
}
