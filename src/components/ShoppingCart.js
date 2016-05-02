import React, {Component, PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import 'styles/styles.scss';
import Constants from './Constants';

const ShoppingCartSpec = {

  // ShoppingCart DND Spec
  // "A plain object implementing the drop target specification"
  //
  // - DropTarget Methods (All optional)
  // - drop: Called when a compatible item is dropped.
  // - hover: Called when an item is hovered over the component.
  // - canDrop: Use it to specify whether the drop target is able to accept
  // the item.
  drop () {
    return {
      name: 'ShoppingCart' };
  }
};

// ShoppingCart DropTarget - collect
//
// - connect: An instance of DropTargetConnector.
// You use it to assign the drop target role to a DOM node.
//
// - monitor: An instance of DropTargetMonitor.
// You use it to connect state from the React DnD to props.
// Available functions to get state include canDrop(), isOver() and didDrop()
// Notice that the prop names you’ve created happen to have the same or similar names as the
// methods from connect and monitor, but they could really be anything (e.g draggingSomethingOverMe:
// monitor.isOver())
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

export class ShoppingCart extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  render () {
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;

    let dropZoneColor = '#FFFFFF';
    if (isActive) {
      dropZoneColor = '#F7F7BD';
    } else if (canDrop) {
      dropZoneColor = '#F7F7F7';
    }

    const cartStyle = {
      backgroundColor: dropZoneColor
    };

    return connectDropTarget(
      <div className='shopping-cart' style={cartStyle}>
        {isActive
          ? 'Hummmm, snack!'
          : 'Drag here to order!'
        }
      </div>
    );
  }
}

export default DropTarget(Constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
