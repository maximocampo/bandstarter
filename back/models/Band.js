const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bandSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  bio: String,
  pictures:[String],
  members: [{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  projects:[{
  type:Schema.Types.ObjectId,
  ref:'Project'
  }]
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Band', bandSchema);
