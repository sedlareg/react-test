/* @flow */
import React, {Component, PropTypes} from 'react';
import List from './List';
import 'styles/styles.scss';

export class KanbanBoard extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
  };

  render () {
    return (
      <div className='app'>
        <List
          id='todo'
          title='To Do'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'todo'
            )}
        />
        <List
          id='in-progress'
          title='In Bearbeitung'
          cards={
            this.props.cards.filter(
              (card) => card.status === 'in-progress'
            )}
        />
        <List
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
