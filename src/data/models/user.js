import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  oauthID: Number,
  username: { type: String, required: true },
  password: { type: String },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model('User', userSchema);

export default User;
