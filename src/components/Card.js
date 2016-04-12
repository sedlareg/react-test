/* @flow */
import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';

export class Card extends Component {
  static propTypes = {
    description: PropTypes.string,
    id: PropTypes.number,
    tasks: PropTypes.array,
    title: PropTypes.string
  };

  constructor () {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  };

  render () {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className='card__details'>
          {this.props.description}
          <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
        </div>);
    }
    return (
      <div className='card'>
        <div className={this.state.showDetails ? 'card__title--is-open' : 'card__title'} onClick={
            () => this.setState({showDetails: !this.state.showDetails})
          }>{this.props.title}</div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;
