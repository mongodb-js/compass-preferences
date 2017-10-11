import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Item } from 'components/item';
import Actions from 'actions';
import { shell } from 'electron';

import styles from './preferences.less';

/**
 * The community product name.
 */
const COMMUNITY = 'mongodb-compass-community';

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
 * The notice message.
 */
const NOTICE = 'With any of these options, none of your personal information or ' +
  'stored data will be submitted.';

/**
 * The preferences component.
 */
class Preferences extends Component {
  static displayName = 'PreferencesComponent';

  static propTypes = {
    isVisible: PropTypes.bool,
    productName: PropTypes.string
  };

  /**
   * Closes the modal.
   */
  onCloseClick() {
    Actions.closePreferences();
  }

  /**
   * Handle enable feedback clicking.
   *
   * @param {Event} evt - The event.
   */
  onFeedbackClick(evt) {
    Actions.enableFeedbackPanel(evt.target.checked);
  }

  /**
   * Handle enable maps clicking.
   *
   * @param {Event} evt - The event.
   */
  onMapsClick(evt) {
    Actions.enableMaps(evt.target.checked);
  }

  /**
   * Handle track errors clicking.
   *
   * @param {Event} evt - The event.
   */
  onErrorsClick(evt) {
    Actions.trackErrors(evt.target.checked);
  }

  /**
   * Handle usage statistics clicking.
   *
   * @param {Event} evt - The event.
   */
  onUsageClick(evt) {
    Actions.trackUsageStatistics(evt.target.checked);
  }

  /**
   * Handle auto updates clicking.
   *
   * @param {Event} evt - The event.
   */
  onUpdatesClick(evt) {
    Actions.autoUpdates(evt.target.checked);
  }

  /**
   * Handle clicking the privacy policy link.
   *
   * @param {Event} evt - The event.
   */
  onPrivacyClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    shell.openExternal('https://www.mongodb.com/legal/privacy-policy');
  }

  /**
   * Is this compass community.
   *
   * @returns {Boolean} If this is compass community.
   */
  isCommunity() {
    return this.props.productName === COMMUNITY;
  }

  /**
   * Render the feedback item.
   *
   * @returns {React.Component} The component.
   */
  renderFeedback() {
    if (!this.isCommunity()) {
      return (
        <Item
          title="Enable Product Feedback Tool"
          description={FEEDBACK}
          dataTestId="product-feedback-checkbox"
          clickHandler={this.onFeedbackClick.bind(this)} />
      );
    }
  }

  /**
   * Render the geo item.
   *
   * @returns {React.Component} The component.
   */
  renderGeo() {
    if (!this.isCommunity()) {
      return (
        <Item
          title="Enable Geographic Visualizations"
          description={MAPS}
          dataTestId="enable-maps-checkbox"
          clickHandler={this.onMapsClick.bind(this)} />
      );
    }
  }

  /**
   * Render Preferences component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    const modalClass = {};
    modalClass[styles.modal] = true;
    modalClass[styles['modal-is-visible']] = this.props.isVisible;
    return (
      <div className={classnames(modalClass)}>
        <div className={classnames(styles.preferences)}>
          <div className={classnames(styles['preferences-content'])}>
            <div className={classnames(styles['preferences-header'])}>
              <h4 className={classnames(styles['preferences-header-title'])} data-test-id="modal-title">
                {TITLE}
              </h4>
            </div>
            <div className={classnames(styles['preferences-body'])}>
              <p>{DESCRIPTION}</p>
              {this.renderFeedback()}
              {this.renderGeo()}
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
              <p>{NOTICE}</p>
              <p>
                Learn more:
                <a onClick={this.onPrivacyClick.bind(this)}>MongoDB Privacy Policy</a>
              </p>
            </div>
            <div className={classnames(styles['preferences-footer'])}>
              <button
                type="button"
                data-test-id="close-privacy-settings-button"
                className={classnames(styles['preferences-footer-button'])}
                onClick={this.onCloseClick.bind(this)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;
export { Preferences };
