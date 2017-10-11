import Model from 'ampersand-model';
import storageMixin from 'storage-mixin';
import get from 'lodash.get';
import { format } from 'util';
import { remote } from 'electron';

/**
 * The network features.
 */
const NETWORK_FEATURES = [
  'enableMaps',
  'trackErrors',
  'enableFeedbackPanel',
  'trackUsageStatistics',
  'autoUpdates'
];

/**
 * Represents preferences in Compass.
 */
const Preferences = Model.extend(storageMixin, {
  props: {
    /**
     * String identifier for this set of preferences. Default is `General`.
     * @type {String}
     */
    id: {
      type: 'string',
      default: 'General',
      required: true
    },
    /**
     * Stores the last version app was run as, e.g. `1.0.5`
     * @type {String}
     */
    lastKnownVersion: {
      type: 'string',
      required: false
    },
    /**
     * Stores whether or not the feature tour should be presented to the
     * user. This is set in the migration step (./migrations/index.js).
     * @type {Boolean}
     */
    showFeatureTour: {
      type: 'string',
      required: false,
      default: undefined
    },
    /**
     * Stores whether or not the network opt-in screen has been shown to
     * the user already.
     * @type {String}
     */
    showedNetworkOptIn: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Stores a unique anonymous user ID (uuid) for the current user
     * @type {String}
     */
    currentUserId: {
      type: 'string',
      required: true,
      default: ''
    },
    /**
     * Whether the user agreed to community license terms.
     * @type {Boolean}
     */
    agreedToLicense: {
      type: 'boolean',
      required: true,
      default: false
    },
    /** Master switch to disable all network traffic, which includes
     * - Google maps
     * - Bugsnag
     * - Intercom
     * - Google Analytics
     * - Auto-updates
     * @type {Boolean}
     */
    networkTraffic: {
      type: 'boolean',
      required: true,
      default: true
    },
    /**
     * Switch to enable/disable maps rendering
     * @type {Boolean}
     */
    enableMaps: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable error reports (renamed from `bugsnag`)
     * @type {Boolean}
     */
    trackErrors: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable Intercom panel (renamed from `intercom`)
     * @type {Boolean}
     */
    enableFeedbackPanel: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable usage statistics collection
     * (renamed from `googleAnalytics`)
     *
     * @type {Boolean}
     */
    trackUsageStatistics: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable automatic updates
     *
     * @type {Boolean}
     */
    autoUpdates: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable index creation/dropping
     *
     * @type {Boolean}
     */
    indexDDL: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable showing the update banner notification, this
     * is independent of the autoUpdates flag and will not prevent checking for
     * and downloading the new versions.
     *
     * @type {Boolean}
     */
    showAutoUpdateBanner: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switch to enable/disable the graphical query builder code
     * @type {Boolean}
     */
    queryBuilder: {
      type: 'boolean',
      required: true,
      default: true
    },
    /**
     * Switch to enable/disable the "Explain Plan" tab on the collection level
     * @type {Boolean}
     */
    showExplainPlanTab: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Allow single document CRUD.
     */
    singleDocumentCrud: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Allow server stats.
     * @type {Boolean}
     */
    serverStats: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Allow chart view.
     * @type {Boolean}
     */
    chartView: {
      type: 'boolean',
      required: true,
      default: false
    },
    /**
     * Switches to enable/disable various authentication / ssl types
     *
     * Warning: currently not hooked into the code, see INT-859.
     *
     * @type {Boolean}
     */
    authMongodb: {
      type: 'boolean',
      required: true,
      default: true
    },
    authKerberos: {
      type: 'boolean',
      required: true,
      default: true
    },
    authLdap: {
      type: 'boolean',
      required: true,
      default: true
    },
    authX509: {
      type: 'boolean',
      required: true,
      default: false
    },
    sslUnvalidated: {
      type: 'boolean',
      required: true,
      default: true
    },
    sslServer: {
      type: 'boolean',
      required: true,
      default: true
    },
    sslAll: {
      type: 'boolean',
      required: true,
      default: true
    }
  },
  extraProperties: 'ignore',
  idAttribute: 'id',
  namespace: 'AppPreferences',
  storage: {
    backend: 'disk',
    basepath: remote.app.getPath('userData')
  },
  /**
   * returns whether or not a given feature is enabled. In most cases, it just
   * passes through whatever property is asked for, but some checks are more
   * complex, like the `disableNetworkTraffic` master switch, which overwrites
   * other feature flags.
   *
   * @param  {String} feature    check for this feature
   * @return {Boolean}           enabled = true, disabled = false
   *
   * @example
   * ```
   * app.isFeatureEnabled('authWithKerberos')
   * ```
   * returns either true or false
   */
  isFeatureEnabled: function(feature) {
    // master network switch overwrites all network related features
    if (NETWORK_FEATURES.indexOf(feature) !== -1) {
      return this.networkTraffic && get(this, feature);
    }
    const res = get(this, feature, null);
    // don't allow asking for unknown features to prevent bugs
    if (res === null) {
      if (feature === 'chartView') {
        // COMPASS-1340 disable chartView error until moved to its own product...
        return false;
      }
      throw new Error(format('Feature %s unknown.', feature));
    }
    return res;
  }
});

export default Preferences;
export { Preferences };
