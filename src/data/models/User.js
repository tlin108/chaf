// load the things we need
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for our user model
const userSchema = mongoose.Schema({

  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

// generating a hash
userSchema.methods.generateHash =
    (password) => {
      bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

// checking if password is valid
userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.local.password);

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);
export default User;
