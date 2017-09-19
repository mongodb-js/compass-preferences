import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import get from 'lodash.get';
import semver from 'semver';
import PreferencesActions from 'actions';
import { Preferences } from 'models';

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
   * Fetch the preferences when the application is initialized.
   *
   * @param {String} version - The application version.
   */
  onInitialized(version) {
    this.state.preferences.fetch({
      success: () => {
        this.updateVersions(version);
      }
    });
  },

  /**
   * Updates the showFeatureTour and lastKnownVersion attributes in the
   * preferences and saves if they changed.
   *
   * @param {String} version - The current version.
   */
  updateVersions(version) {
    let save = false;
    const oldVersion = get(this.state.preferences, 'lastKnownVersion', '0.0.0');
    if (semver.lt(oldVersion, version)) {
      this.state.preferences.showFeatureTour = oldVersion;
      save = true;
    }
    if (semver.neq(oldVersion, version)) {
      this.state.preferences.lastKnownVersion = version;
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
      preferences: new Preferences()
    };
  }
});

export default PreferencesStore;
export { PreferencesStore };
