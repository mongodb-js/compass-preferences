import Reflux from 'reflux';

const PreferencesActions = Reflux.createActions([
  'enableFeedbackPanel',
  'enableMaps',
  'trackErrors',
  'trackUsageStatistics',
  'autoUpdates',
  'featureTourShown',
  'closePreferences',
  'openPreferences',
  'agreeToLicense',
  'disagreeWithLicense'
]);

export default PreferencesActions;
export { PreferencesActions };
