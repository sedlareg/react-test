/* @flow */
import React, {Component, PropTypes} from 'react';
import List from './List';
import 'styles/styles.scss';

export class KanbanBoard extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
  };

  render () {
    return (
      <div className='app'>
        <List
          taskCallbacks={this.props.taskCallbacks}
          id='todo'
          title='To Do'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'todo'
            )}
        />
        <List
          taskCallbacks={this.props.taskCallbacks}
          id='in-progress'
          title='In Bearbeitung'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'in-progress'
            )}
        />
        <List
          taskCallbacks={this.props.taskCallbacks}
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

export default KanbanBoard;
