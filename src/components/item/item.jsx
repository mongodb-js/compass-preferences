import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './item.less';

class Item extends Component {
  static displayName = 'ItemComponent';

  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataTestId: PropTypes.string
  };

  /**
   * Render the Item component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className={classnames(styles['preferences-body-item'])}>
        <label>
          <input type="checkbox" data-test-id={this.props.dataTestId} onClick={this.props.clickHandler} />
          <span>{this.props.title}</span>
        </label>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default Item;
export { Item };
