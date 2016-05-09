/* @flow */
import React, {Component, PropTypes} from 'react';
import ShoppingListContainer from '../../containers/ShoppingListContainer';

export class ShoppingList extends Component {
  static propTypes = {
    route: PropTypes.object
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <ShoppingListContainer />
      </div>
    );
  }
}

export default ShoppingList;
