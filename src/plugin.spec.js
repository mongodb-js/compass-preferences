import React from 'react';
import { shallow } from 'enzyme';
import { StoreConnector } from 'hadron-react-components';
import preferencesPluginInjector from 'inject-loader!./plugin';
const PreferencesPlugin = preferencesPluginInjector({
  'components/preferences': () => (<div />),
  'stores': {
    PreferencesStore: {}
  }
}).default;

describe('Preferences [Plugin]', () => {
  let component;

  beforeEach((done) => {
    component = shallow(<PreferencesPlugin />);
    done();
  });

  afterEach((done) => {
    component = null;
    done();
  });

  it('should contain a <StoreConnector /> with a store prop', function() {
    expect(component.find(StoreConnector).first().props('store')).to.be.an('object');
  });
});
