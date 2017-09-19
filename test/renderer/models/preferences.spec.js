import { Preferences } from 'models';

describe('Preferences [Model]', () => {
  describe('#isFeatureEnabled', () => {
    context('when the feature exists', () => {
      context('when the feature is enabled', () => {
        const preferences = new Preferences({ chartView: true });

        it('returns true', () => {
          expect(preferences.isFeatureEnabled('chartView')).to.equal(true);
        });
      });

      context('when the feature is disabled', () => {
        const preferences = new Preferences();

        it('returns false', () => {
          expect(preferences.isFeatureEnabled('chartView')).to.equal(false);
        });
      });

      context('when the feature is a network feature', () => {
        context('when network traffic is enabled', () => {
          context('when the feature is enabled', () => {
            const preferences = new Preferences({ enableMaps: true });

            it('returns true', () => {
              expect(preferences.isFeatureEnabled('enableMaps')).to.equal(true);
            });
          });

          context('when the feature is disabled', () => {
            const preferences = new Preferences();

            it('returns false', () => {
              expect(preferences.isFeatureEnabled('enableMaps')).to.equal(false);
            });
          });
        });

        context('when network traffic is disabled', () => {
          context('when the feature is enabled', () => {
            const preferences = new Preferences({ networkTraffic: false, enableMaps: true });

            it('returns false', () => {
              expect(preferences.isFeatureEnabled('enableMaps')).to.equal(false);
            });
          });

          context('when the feature is disabled', () => {
            const preferences = new Preferences({ networkTraffic: false });

            it('returns false', () => {
              expect(preferences.isFeatureEnabled('enableMaps')).to.equal(false);
            });
          });
        });
      });
    });

    context('when the feature does not exist', () => {
      const preferences = new Preferences();

      it('raises an error', () => {
        expect(preferences.isFeatureEnabled.bind(preferences, 'imnofeature')).
          to.throw('Feature imnofeature unknown.');
      });
    });
  });
});
