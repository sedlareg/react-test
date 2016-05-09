/* @flow */
import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {DragSource, DropTarget} from 'react-dnd';
import Constants from './Constants';
import {Link} from 'react-router';
import 'styles/styles.scss';

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

const cardDragSpec = {
  beginDrag (props) {
    return {
      id: props.id,
      status: props.status
    };
  },
  endDrag (props) {
    props.cardCallbacks.persistCardDrag(props.id, props.status);
  }
};

const cardDropSpec = {
  hover (props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
};

let collectDrag = (connect, monitor) => {
  return {connectDragSource: connect.dragSource()};
};

let collectDrop = (connect, monitor) => {
  return {connectDropTarget: connect.dropTarget()};
};

class Card extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object,
    color: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
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
    const {connectDragSource, connectDropTarget} = this.props;
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

    return connectDropTarget(connectDragSource(
      <div className='card'>
        <div style={sideColor}/>
        <div className='card__edit'><Link to={`/board/edit/${this.props.id}`}>&#9998;</Link></div>
        <div className={this.state.showDetails ? 'card__title--is-open' : 'card__title'}
          onClick={this.toggleDetails}>{this.props.title}
        </div>
        <ReactCSSTransitionGroup
          transitionName='toggleCard'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    ));
  }
}

const dragHighOrderCard = DragSource(Constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(Constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;
