/* @flow */
import React, {Component, PropTypes} from 'react';
import Card from './Card';
import 'styles/styles.scss';
import {DropTarget} from 'react-dnd';
import Constants from './Constants';

const listTargetSpec = {
  hover (props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  }
};

function collect (connect, monitor) {
  return {connectDropTarget: connect.dropTarget()};
};

class List extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object),
    connectDropTarget: PropTypes.func.isRequired,
    taskCallbacks: PropTypes.object,
    title: PropTypes.string.isRequired
  };

  render () {
    const { connectDropTarget } = this.props;
    const cards = this.props.cards.map(
      (card, index) => {
        return <Card
          key={index}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          {...card}
        />;
      }
    );
    return connectDropTarget(
      <div className='list'>
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

export default DropTarget(Constants.CARD, listTargetSpec, collect)(List);
