import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './preferences.less';

class Preferences extends Component {
  static displayName = 'PreferencesComponent';

  static propTypes = {
    actions: PropTypes.object.isRequired,
    status: PropTypes.oneOf(['enabled', 'disabled'])
  };

  static defaultProps = {
    status: 'enabled'
  };

  onClick = () => {
    this.props.actions.toggleStatus();
  }

  /**
   * Render Preferences component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames(styles.root)}>
        <h2 className={classnames(styles.title)}>Preferences Plugin</h2>
        <p>Compass Preferences Plugin</p>
      </div>
    );
  }
}

export default Preferences;
export { Preferences };
