import React from 'react';

export default class UsernameField extends React.Component {
  static propTypes = {
    onUsernameChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string.isRequired,
  };

  render() {
    const {
      onUsernameChange,
      className,
    } = this.props;

    return (
      <input
        type="text"
        id="username"
        className={className}
        name="username"
        autoFocus
        onChange={({ target }) => onUsernameChange(target.value)}
      />
    );
  }
}
