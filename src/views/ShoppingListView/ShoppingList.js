/* @flow */
import React, {Component} from 'react';
import ShoppingListContainer from '../../containers/ShoppingListContainer';

export class ShoppingList extends Component {
  render () {
    return (
      <div>
        <ShoppingListContainer />
      </div>
    );
  }
}

export default ShoppingList;
