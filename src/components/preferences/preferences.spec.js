import React from 'react';
import { mount } from 'enzyme';

import Preferences from 'components/preferences';
import styles from './preferences.less';

describe('Preferences [Component]', () => {
  let component;
  let actions;

  beforeEach((done) => {
    actions = { toggleStatus: sinon.stub() };
    component = mount(<Preferences actions={actions} />);
    done();
  });

  afterEach((done) => {
    component = null;
    actions = null;
    done();
  });

  it('renders the correct root classname', () => {
    expect(component.find(`.${styles.root}`)).to.have.length(1);
  });

  it('should contain one <h2> tag', function() {
    expect(component.find('h2')).to.have.length(1);
  });
});
