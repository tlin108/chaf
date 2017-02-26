/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

import { UsernameField, PasswordField } from '../../components/Auth';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  // Username helpers

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  // Password helpers

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  };

  // Form helpers

  onFormSubmit = (e) => {
    e.preventDefault();

    // testing for form submission
    // const { username, password } = this.state;

    // if (this.validateSubmission()) {
    //   console.log('Submitting:', username, password);
    // } else {

    // }
  };

  // return true if submission passes all new user creation requirements
  validateSubmission = () => {
    const { username, password, confirmPassword } = this.state;
    return username.length >= 5 && password.length >= 8 && password === confirmPassword;
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                Username:
              </label>
              <UsernameField
                className={s.input}
                onUsernameChange={this.onUsernameChange}
              />
              <small className="form-text text-muted">Minimum 5 characters</small>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <PasswordField
                className={s.input}
                passwordType={'password'}
                onPasswordChange={this.onPasswordChange}
              />
              <small className="form-text text-muted">Minimum 8 characters</small>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <PasswordField
                className={s.input}
                passwordType={'confirmPassword'}
                onPasswordChange={this.onConfirmPasswordChange}
              />
            </div>
            <div className={s.formGroup}>
              <button
                className={s.button}
                type="submit"
                onClick={this.onFormSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
