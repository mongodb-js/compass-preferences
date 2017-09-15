import React, { Component } from 'react';
import { StoreConnector } from 'hadron-react-components';
import Preferences from 'components/preferences';
import store from 'stores';
import actions from 'actions';

class Plugin extends Component {
  static displayName = 'PreferencesPlugin';

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <StoreConnector store={store}>
        <Preferences actions={actions} {...this.props} />
      </StoreConnector>
    );
  }
}

export default Plugin;
export { Plugin };
