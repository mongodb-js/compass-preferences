import Reflux from 'reflux';

const PreferencesActions = Reflux.createActions([
  'enableFeedbackPanel',
  'enableMaps',
  'trackErrors',
  'trackUsageStatistics',
  'autoUpdates',
  'featureTourShown'
]);

export default PreferencesActions;
export { PreferencesActions };
