import React from 'react';

export default class PasswordField extends React.Component {
  static propTypes = {
    onPasswordChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string.isRequired,
    passwordType: React.PropTypes.string.isRequired,
  };

  render() {
    const {
      onPasswordChange,
      className,
      passwordType,
    } = this.props;

    return (
      <input
        id={passwordType}
        className={className}
        type="password"
        name={passwordType}
        onChange={({ target }) => onPasswordChange(target.value)}
      />
    );
  }
}
