import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './preferences.less';

class Preferences extends Component {
  static displayName = 'PreferencesComponent';

  static propTypes = {
    preferences: PropTypes.object
  };

  /**
   * Render Preferences component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames(styles.preferences)}>
      </div>
    );
  }
}

export default Preferences;
export { Preferences };
