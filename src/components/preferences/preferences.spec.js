import React from 'react';
import { mount } from 'enzyme';

import Preferences from 'components/preferences';
// import styles from './preferences.less';

describe('Preferences [Component]', () => {
  describe('#render', () => {
    let component;
    const prefs = {};

    beforeEach(() => {
      component = mount(<Preferences preferences={prefs} />);
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('renders the correct root classname', () => {
      expect(component.find('.modal-dialog')).to.be.present();
    });
  });
});
