import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import get from 'lodash.get';
import semver from 'semver';
import ipc from 'hadron-ipc';
import PreferencesActions from 'actions';
import { Preferences } from 'models';

/**
 * The community product name.
 */
const COMMUNITY = 'mongodb-compass-community';

/**
 * The compass product name.
 */
const COMPASS = 'mongodb-compass';

/**
 * Preferences store.
 */
const PreferencesStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   *
   * If you call `this.setState({...})` this will cause the store to trigger
   * and push down its state as props to connected components.
   */
  mixins: [StateMixin.store],

  /**
   * listen to all actions defined in ../actions/index.jsx
   */
  listenables: PreferencesActions,

  /**
   * Listen for the ipc calls to show the modal.
   */
  init() {
    ipc.on('window:show-preferences', this.openPreferences.bind(this));
  },

  /**
   * Close the preferences.
   */
  closePreferences() {
    this.setState({ isVisible: false });
  },

  /**
   * Open the preferences.
   */
  openPreferences() {
    this.setState({ isVisible: true });
  },

  /**
   * Setup app registry listeners on activation.
   *
   * @param {AppRegistry} appRegistry - The app registry.
   */
  onActivated(appRegistry) {
    appRegistry.on('application-initialized', this.onInitialized.bind(this));
  },

  /**
   * Fetch the preferences when the application is initialized.
   *
   * @param {String} version - The application version.
   * @param {String} name - The application product name.
   */
  onInitialized(version, name) {
    this.state.preferences.fetch({
      success: () => {
        this.updateVersions(version, name);
      }
    });
  },

  /**
   * Set the enable feedback panel property.
   *
   * @param {Boolean} enabled - If the property is enabled.
   */
  enableFeedbackPanel(enabled) {
    this.state.preferences.save({ enableFeedbackPanel: enabled }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Set the enable maps property.
   *
   * @param {Boolean} enabled - If the property is enabled.
   */
  enableMaps(enabled) {
    this.state.preferences.save({ enableMaps: enabled }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Set the track errors property.
   *
   * @param {Boolean} enabled - If the property is enabled.
   */
  trackErrors(enabled) {
    this.state.preferences.save({ trackErrors: enabled }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Set the usage statistics property.
   *
   * @param {Boolean} enabled - If the property is enabled.
   */
  trackUsageStatistics(enabled) {
    this.state.preferences.save({ trackUsageStatistics: enabled }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Set the auto updates property.
   *
   * @param {Boolean} enabled - If the property is enabled.
   */
  autoUpdates(enabled) {
    this.state.preferences.save({ autoUpdates: enabled }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Agree to the license terms.
   */
  agreeToLicense() {
    this.state.preferences.save({ agreedToLicense: true }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Disagree with the license terms.
   */
  disagreeWithLicense() {
    this.state.preferences.save({ agreedToLicense: false }, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Flag the feature tour as shown.
   */
  featureTourShown() {
    this.state.preferences.unset('showFeatureTour');
    this.state.preferences.save(null, {
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  /**
   * Updates the showFeatureTour and lastKnownVersion attributes in the
   * preferences and saves if they changed.
   *
   * @param {String} version - The current version.
   * @param {String} name - The product name.
   */
  updateVersions(version, name = COMPASS) {
    let save = false;
    this.state.productName = name;
    const oldVersion = get(this.state.preferences, 'lastKnownVersion', '0.0.0');
    if (semver.lt(oldVersion, version)) {
      this.state.preferences.showFeatureTour = oldVersion;
      save = true;
    }
    if (semver.neq(oldVersion, version)) {
      this.state.preferences.lastKnownVersion = version;
      save = true;
    }
    if (name === COMMUNITY) {
      this.state.preferences.enableMaps = false;
      this.state.preferences.enableFeedbackPanel = false;
      save = true;
    }
    if (save) {
      this.state.preferences.save(null, {
        success: () => {
          this.trigger(this.state);
        }
      });
    } else {
      this.trigger(this.state);
    }
  },

  /**
   * Initialize the Preferences store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    return {
      preferences: new Preferences(),
      isVisible: false,
      productName: COMPASS
    };
  }
});

export default PreferencesStore;
export { PreferencesStore };
