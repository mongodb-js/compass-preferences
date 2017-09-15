import Store from 'stores';

describe('PreferencesStore [Store]', () => {
  beforeEach(() => {
    Store.setState(Store.getInitialState());
  });

  it('should default to an empty preferences object', function() {
    expect(Store.state.preferences).to.deep.equal({});
  });
});
