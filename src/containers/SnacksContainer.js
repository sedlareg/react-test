/* @flow */
import React, {Component} from 'react';
import Snack from 'components/Snack';
import ShoppingCart from 'components/ShoppingCart';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'styles/styles.scss';

export class SnacksContainer extends Component {

  render () {
    return (
      <div>
        <Snack name='Chips' />
        <Snack name='Cupcake' />
        <Snack name='Donut' />
        <Snack name='Doritos' />
        <Snack name='Popcorn' />
        <ShoppingCart />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SnacksContainer);
