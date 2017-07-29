import { mongoose } from "../config/database";
import { Schema, Document, Model } from "mongoose";

export enum CellType {
  EUCARYOTE,
  PROCARYOTE
};

export interface ICell extends Document {
  name: string;
  cellType: CellType;
  color: string;
  size: number;
}

export interface ICellModel extends Model<ICell> {
    findAll(): Promise<ICell>
}

// create a schema
const schema = new Schema({
  name: String,
  cellType: {
    type: String,
    enum: ['EUCARYOTE', 'PROCARYOTE']
  },
  color: String,
  size: Number
});

schema.static("findAll", () => {
    return Cell
        .find({})
        .lean()
        .exec();
});

export const Cell = mongoose.model<ICell>("Cell", schema) as ICellModel;