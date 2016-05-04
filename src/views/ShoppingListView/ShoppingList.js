/* @flow */
import React, {Component} from 'react';
import ShoppingListContainer from '../../containers/ShoppingListContainer';

export class ShoppingList extends Component {
  render () {
    return (
      <div className='container'>
        <ShoppingListContainer />
      </div>
    );
  }
}

export default ShoppingList;
