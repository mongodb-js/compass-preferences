import PreferencesPlugin from './plugin';
import PreferencesActions from 'actions';
import PreferencesStore from 'stores';

/**
 * The preferences role.
 */
const ROLE = {
  name: 'Privacy Settings',
  component: PreferencesPlugin
};

/**
 * Activate all the components in the Preferences package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
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
