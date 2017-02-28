/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import _ from 'lodash';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { reduxForm } from 'redux-form';
import s from './Register.css';

const FIELDS = {
  username: {
    type: 'input',
    label: 'Username:',
  },
  password: {
    type: 'password',
    label: 'Password:',
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm Password:',
  },
};

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

  renderField = fieldConfig => (
    <div key={fieldConfig.label} className={s.formGroup}>
      <label className={s.label} htmlFor={fieldConfig.label}>
        {fieldConfig.label}
      </label>
      <input
        type={fieldConfig.type}
        id={fieldConfig.label}
        className={s.input}
      />
    </div>
    )

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post">
            {_.map(FIELDS, this.renderField)}
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

export default withStyles(s)(reduxForm({
  form: 'registerUser',
  fields: _.keys(FIELDS),
})(Register));
