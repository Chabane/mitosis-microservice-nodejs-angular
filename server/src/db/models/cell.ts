import { mongoose } from "../config/database";
import { Schema, Document, Model } from "mongoose";

export enum CellType {
  EUCARYOTE,
  PROCARYOTE
};

export interface ICell extends Document {
  name: string;
  type: CellType;
  color: string;
  size: number;
}

export interface ICellModel extends Model<ICell> {
  findByType(type: CellType): Promise<Array<ICell>>;
  findAll(): Promise<Array<ICell>>;
  save(cell: ICell): Promise<ICell>;
}

// create a schema
const schema = new Schema({
  name: String,
  type: String,
  color: String,
  size: Number
});

schema.static("findByType", (cellType: CellType) => {
  return Cell
    .find({ 'type': cellType })
    .exec();
});

schema.static("findAll", () => {
  return Cell
    .find();
});

schema.static("save", (newCell: ICell) => {
  return Cell.create(newCell);
});

export const Cell = mongoose.model<ICell>("Cell", schema) as ICellModel;

