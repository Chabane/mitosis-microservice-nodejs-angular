import { mongoose } from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var cellSchema = new Schema({
  id: Number,
  name: String,
  cellType: {
    type: String,
    enum: ['EUCARYOTE', 'PROCARYOTE']
  },
  color: String,
  size: Number
});

// the schema is useless so far
// we need to create a model using it
var Cell = mongoose.model('Cell', cellSchema);
