import React from 'react';
import { mount } from 'enzyme';

import Item from 'components/item';
import styles from './item.less';

describe('Item [Component]', () => {
  describe('#render', () => {
    let component;

    beforeEach(() => {
      component = mount(
        <Item clickHandler={sinon.spy()} description="desc" title="title" />
      );
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['preferences-body-item']}`)).to.be.present();
    });

    it('renders the title', () => {
      expect(component.find('span')).to.have.text('title');
    });

    it('renders the description', () => {
      expect(component.find('p')).to.have.text('desc');
    });

    it('renders the chckbox', () => {
      expect(component.find('input')).to.be.present();
    });
  });
});
