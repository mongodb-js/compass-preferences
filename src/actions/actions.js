import Reflux from 'reflux';

const PreferencesActions = Reflux.createActions([
  'enableFeedbackPanel',
  'enableMaps',
  'trackErrors',
  'trackUsageStatistics',
  'autoUpdates'
]);

export default PreferencesActions;
export { PreferencesActions };
