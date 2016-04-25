/* @flow */
import React, {Component, PropTypes} from 'react';
import Card from './Card';
import 'styles/styles.scss';

export class List extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    title: PropTypes.string.isRequired
  };

  render () {
    const cards = this.props.cards.map(
      (card, index) => {
        return <Card
          key={index}
          taskCallbacks={this.props.taskCallbacks}
          {...card}
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
