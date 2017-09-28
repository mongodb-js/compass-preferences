import React from 'react';
import { mount } from 'enzyme';

import Preferences from 'components/preferences';
import styles from './preferences.less';

describe('Preferences [Component]', () => {
  describe('#render', () => {
    let component;
    const prefs = {};

    beforeEach(() => {
      component = mount(<Preferences preferences={prefs} isVisible />);
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles.modal}`)).to.be.present();
    });

    it('renders the title', () => {
      expect(component.find('h4')).to.have.text('Privacy Settings');
    });

    it('renders the feeback checkbox', () => {
      expect(component.find('[data-test-id="product-feedback-checkbox"]')).to.be.present();
    });

    it('renders the geo checkbox', () => {
      expect(component.find('[data-test-id="enable-maps-checkbox"]')).to.be.present();
    });

    it('renders the crash reports checkbox', () => {
      expect(component.find('[data-test-id="track-errors-checkbox"]')).to.be.present();
    });

    it('renders the usage checkbox', () => {
      expect(component.find('[data-test-id="usage-stats-checkbox"]')).to.be.present();
    });

    it('renders the updates checkbox', () => {
      expect(component.find('[data-test-id="auto-updates-checkbox"]')).to.be.present();
    });

    it('renders the privact policy link', () => {
      expect(component.find('a')).to.have.text('MongoDB Privacy Policy');
    });

    it('renders the close button', () => {
      expect(component.find('button')).to.have.text('Close');
    });
  });
});
