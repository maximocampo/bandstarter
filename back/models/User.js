const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  name: String,
  bio: String,
  profilePic:String,
  influences:[String],
  instruments:[String],
  snippets:[String],
  bands:[{
    type:Schema.Types.ObjectId,
    ref:"Band"
  }]
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


userSchema.plugin(PassportLocalMongoose, {
  usernameField:"email"
});

module.exports = mongoose.model('User', userSchema);
