/* @flow */
import React, {Component, PropTypes} from 'react';
import Card from './Card';
import 'styles/styles.scss';

export class List extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired
  };

  render () {
    const cards = this.props.cards.map(
      (card, index) => {
        return <Card key={index}
          id={card.id}
          title={card.title}
          description={card.description}
          tasks={card.tasks}
          color={card.color}
        />;
      }
    );
    return (
      <div className='list'>
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

export default List;
