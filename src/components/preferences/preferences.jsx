import React, { Component } from 'react';
import classnames from 'classnames';
import { Item } from 'components/item';

// import styles from './preferences.less';

/**
 * The title.
 */
const TITLE = 'Privacy Settings';

/**
 * The modal description.
 */
const DESCRIPTION = 'To enhance the user experience, Compass can integrate with 3rd party services,' +
  'which requires external network requests. Please choose from the settings below:';

/**
 * Feedback description.
 */
const FEEDBACK = 'Enables a tool for sending feedback or talking to our Product' +
  'and Development teams directly from Compass.';

/**
 * Maps description.
 */
const MAPS = 'Allow Compass to make requests to a 3rd party mapping service.';

/**
 * Errors description.
 */
const ERRORS = 'Allow Compass to send crash reports containing stack traces and unhandled exceptions.';

/**
 * Usage description.
 */
const USAGE = 'Allow Compass to send anonymous usage statistics.';

/**
 * Updates description.
 */
const UPDATES = 'Allow Compass to periodically check for new updates.';

/**
 * The preferences component.
 */
class Preferences extends Component {
  static displayName = 'PreferencesComponent';

  onFeedbackClick() {

  }

  onMapsClick() {

  }

  onErrorsClick() {

  }

  onUsageClick() {

  }

  onUpdatesClick() {

  }

  /**
   * Render Preferences component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames('modal-dialog')}>
        <div className={classnames('modal-content')}>
          <div className={classnames('modal-header')}>
            <h4 className={classnames('modal-title')} data-test-id="modal-title">
              {TITLE}
            </h4>
          </div>
          <div className={classnames('modal-body')}>
            <p>{DESCRIPTION}</p>
            <ul>
              <Item
                title="Enable Product Feedback Tool"
                description={FEEDBACK}
                dataTestId="product-feedback-checkbox"
                clickHandler={this.onFeedbackClick.bind(this)} />
              <Item
                title="Enable Geographic Visualizations"
                description={MAPS}
                dataTestId="enable-maps-checkbox"
                clickHandler={this.onMapsClick.bind(this)} />
              <Item
                title="Enable Crash Reports"
                description={ERRORS}
                dataTestId="track-errors-checkbox"
                clickHandler={this.onErrorsClick.bind(this)} />
              <Item
                title="Enable Usage Statistics"
                description={USAGE}
                dataTestId="usage-stats-checkbox"
                clickHandler={this.onUsageClick.bind(this)} />
              <Item
                title="Enable Automatic Updates"
                description={UPDATES}
                dataTestId="auto-updates-checkbox"
                clickHandler={this.onUpdatesClick.bind(this)} />
            </ul>
            <p>With any of these options, none of your personal information or stored data will be submitted.</p>
            <p>
              Learn more:
              <a href="https://www.mongodb.com/legal/privacy-policy">MongoDB Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;
export { Preferences };
