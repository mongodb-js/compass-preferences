import PreferencesPlugin from './plugin';
import PreferencesActions from 'actions';
import PreferencesStore from 'stores';

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'Preferences',
  component: PreferencesPlugin
};

/**
 * Activate all the components in the Preferences package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  // Register the PreferencesPlugin as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  appRegistry.registerRole('Application.Preferences', ROLE);
  appRegistry.registerAction('Preferences.Actions', PreferencesActions);
  appRegistry.registerStore('Preferences.Store', PreferencesStore);
}

/**
 * Deactivate all the components in the Preferences package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Application.Preferences', ROLE);
  appRegistry.deregisterAction('Preferences.Actions');
  appRegistry.deregisterStore('Preferences.Store');
}

export default PreferencesPlugin;
export { activate, deactivate };
