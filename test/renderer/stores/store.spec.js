import Store from 'stores';
import Actions from 'actions';

describe('PreferencesStore [Store]', () => {
  afterEach(() => {
    Store.state = Store.getInitialState();
  });

  it('should default to an empty preferences object', function() {
    expect(Store.state.preferences.showedNetworkOptIn).to.equal(false);
  });

  describe('#closePreferences', () => {
    beforeEach(() => {
      Store.state.isVisible = true;
    });

    it('sets visible to false', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.isVisible).to.equal(false);
        done();
      });
      Store.closePreferences();
    });
  });

  describe('#openPreferences', () => {
    it('sets visible to true', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.isVisible).to.equal(true);
        done();
      });
      Store.openPreferences();
    });
  });

  describe('#onInitialized', () => {
    context('when the old app version does not exist', () => {
      it('sets the last known version to the current version', (done) => {
        const unsubscribe = Store.listen((state) => {
          unsubscribe();
          expect(state.preferences.lastKnownVersion).to.equal('1.0.0');
          done();
        });
        Store.onInitialized('1.0.0');
      });
    });
  });

  describe('#enableFeedbackPanel', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.enableFeedbackPanel).to.equal(true);
        done();
      });
      Actions.enableFeedbackPanel(true);
    });
  });

  describe('#enableMaps', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.enableMaps).to.equal(true);
        done();
      });
      Actions.enableMaps(true);
    });
  });

  describe('#agreeToLicense', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.agreedToLicense).to.equal(true);
        done();
      });
      Actions.agreeToLicense();
    });
  });

  describe('#disagreeWithLicense', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.agreedToLicense).to.equal(false);
        done();
      });
      Actions.disagreeWithLicense();
    });
  });

  describe('#trackErrors', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.trackErrors).to.equal(true);
        done();
      });
      Actions.trackErrors(true);
    });
  });

  describe('#trackUsageStatistics', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.trackUsageStatistics).to.equal(true);
        done();
      });
      Actions.trackUsageStatistics(true);
    });
  });

  describe('#autoUpdates', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.autoUpdates).to.equal(true);
        done();
      });
      Actions.autoUpdates(true);
    });
  });

  describe('#featureTourShown', () => {
    it('saves the property', (done) => {
      const unsubscribe = Store.listen((state) => {
        unsubscribe();
        expect(state.preferences.showFeatureTour).to.equal(undefined);
        done();
      });
      Actions.featureTourShown();
    });
  });

  describe('#updateVersions', () => {
    context('when the old app version exists', () => {
      beforeEach(() => {
        Store.state.preferences.lastKnownVersion = '1.0.0';
        Store.state.preferences.showFeatureTour = '1.0.0';
      });

      context('when the product name is compass community', () => {
        it('disables the feedback panel', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.enableFeedbackPanel).to.equal(false);
            done();
          });
          Store.updateVersions('1.0.0', 'mongodb-compass-community');
        });

        it('disables the maps', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.enableMaps).to.equal(false);
            done();
          });
          Store.updateVersions('1.0.0', 'mongodb-compass-community');
        });
      });

      context('when the old version is less than the new version', () => {
        it('saves the feature tour preference to the old version', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.showFeatureTour).to.equal('1.0.0');
            done();
          });
          Store.updateVersions('2.0.0');
        });
      });

      context('when the old version is equal to the new version', () => {
        it('does not change the feature tour version', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.showFeatureTour).to.equal('1.0.0');
            done();
          });
          Store.updateVersions('1.0.0');
        });
      });

      context('when the old version is greater than the new version', () => {
        it('does not change the feature tour version', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.showFeatureTour).to.equal('1.0.0');
            done();
          });
          Store.updateVersions('0.5.0');
        });
      });

      context('when the old version and the new version are not equal', () => {
        it('saves the last known version to the new version', (done) => {
          const unsubscribe = Store.listen((state) => {
            unsubscribe();
            expect(state.preferences.lastKnownVersion).to.equal('1.5.0');
            done();
          });
          Store.updateVersions('1.5.0');
        });
      });
    });
  });
});
