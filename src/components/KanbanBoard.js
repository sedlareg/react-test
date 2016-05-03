/* @flow */
import React, {Component, PropTypes} from 'react';
import List from './List';
import 'styles/styles.scss';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
  };

  render () {
    return (
      <div className='app'>
        <List
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id='todo'
          title='To Do'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'todo'
            )}
        />
        <List
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id='in-progress'
          title='In Bearbeitung'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'in-progress'
            )}
        />
        <List
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          id='done'
          title='Erledigt'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'done'
            )}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);
