/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import mongoose from 'mongoose';

const schema = mongoose.Schema;

const UserSchema = new schema({
  username: String,
  password: String,
  date: { type: Date, Default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
