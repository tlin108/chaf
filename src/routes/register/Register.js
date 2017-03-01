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
import { Field, reduxForm } from 'redux-form';
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

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username Required';
  } else if (values.username.length < 5) {
    errors.username = 'Must be 5 characters or more';
  }
  if (!values.password) {
    errors.password = 'Password Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Must be the same as password';
  }
  return errors;
};

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
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

  renderInput = field => (
    <div className={field.meta.touched && field.meta.error ? 'has-danger' : ''}>
      <input {...field.input} type={field.type} className="form-control" />
      {field.meta.touched &&
           field.meta.error &&
           <span className="form-control-feedback">{field.meta.error}</span>}
    </div>
      )

  renderField = (fieldConfig, field) => (
    <div key={fieldConfig.label} className="form-group">
      <label className={`form-control-label ${s.label}`} htmlFor={fieldConfig.label}>
        {fieldConfig.label}
      </label>
      <Field
        name={field}
        component={this.renderInput}
        type={fieldConfig.type}
        className="form-control"
      />
    </div>
    )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            {_.map(FIELDS, this.renderField)}
            <div className={s.formGroup}>
              <button
                className={s.button}
                type="submit"
                disabled={pristine || submitting}
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
  validate,
})(Register));
