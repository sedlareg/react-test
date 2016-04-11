/* @flow */
import React, {Component} from 'react';
import KanbanBoard from '../../components/KanbanBoard.js';

const cardList = [
  {
    id: 1,
    title: 'Read the book',
    description: 'I should read the whole book',
    status: 'in-progress',
    tasks: []
  },
  {
    id: 2,
    title: 'Write some code',
    description: 'Code along with the samples in the book',
    status: 'todo',
    tasks: [
      {
        id: 1,
        name: 'ContactList Example',
        done: true
      },
      {
        id: 2,
        name: 'Kanban Example',
        done: false
      },
      {
        id: 3,
        name: 'My own Experiments',
        done: false
      },
      {
        id: 4,
        name: 'My own Experiments',
        done: false
      }
    ]
  }
];

export class HomeView extends Component {
  render () {
    return (
      <div>
        <KanbanBoard cards={cardList} />
      </div>
    );
  }
}

export default HomeView;
