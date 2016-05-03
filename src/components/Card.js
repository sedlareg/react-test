/* @flow */
import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in {componentName} is longer than 80 chars!`
      );
    }
  }
};

export class Card extends Component {
  static propTypes = {
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object),
    title: titlePropType
  };

  constructor () {
    super(...arguments);
    this.state = {
      showDetails: false
    };
    this.toggleDetails = ::this._toggleDetails;
  };

  _toggleDetails () {
    this.setState({showDetails: !this.state.showDetails});
  };

  render () {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className='card__details'>
          {this.props.description}
          <CheckList
            cardId={this.props.id}
            tasks={this.props.tasks}
            taskCallbacks={this.props.taskCallbacks}
          />
        </div>);
    }

    const sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 8,
      backgroundColor: this.props.color
    };

    return (
      <div className='card'>
        <div style={sideColor} />
        <div className={this.state.showDetails ? 'card__title--is-open' : 'card__title'}
          onClick={this.toggleDetails}>{this.props.title}</div>
        <ReactCSSTransitionGroup
          transitionName='toggleCard'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Card;
