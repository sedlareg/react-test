/* @flow */
import React, {Component} from 'react';
import KanbanBoard from '../../components/KanbanBoard';

const cardList = [
  {
    id: 1,
    title: 'Kinder glücklich machen',
    description: 'Ich sollte die Kinder mit Geschenken überhäufen',
    status: 'in-progress',
    color: '#BD8D31',
    tasks: []
  },
  {
    id: 2,
    title: 'React Code Beispiele',
    description: 'Üben, üben und üben...',
    status: 'todo',
    color: '#3A7E28',
    tasks: [
      {
        id: 1,
        name: 'Beispiel Kontaktliste',
        done: true
      },
      {
        id: 2,
        name: 'Beispiel Blog',
        done: false
      },
      {
        id: 3,
        name: 'Meine eigenen Experimente',
        done: false
      },
      {
        id: 4,
        name: 'Noch mehr Experimente ',
        done: false
      }
    ]
  },
  {
    id: 3,
    title: 'Ein Title mit einer wirklich sehr sehr langen Überschrift die eigentlich nicht hier stehen sollte...',
    description: '---',
    status: 'done',
    color: '#CF34Co',
    tasks: []
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
