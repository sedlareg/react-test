/* @flow */
import React, {Component, PropTypes} from 'react';
import 'styles/styles.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class ShoppingListContainer extends Component {
  constructor () {
    super(...arguments);
    // Create an "items" state pre-populated with some shopping items
    this.state = {
      items: [
        {id: 1, name: 'Milk'},
        {id: 2, name: 'Yogurt'},
        {id: 3, name: 'Orange Juice'}
      ]
    };

    this.handleChange = ::this._handleChange;
    this.handleRemove = ::this._handleRemove;
  }

  // Called when the user changes the input field
  _handleChange (evt) {
    if (evt.key === 'Enter') {
      // Create a new item and set the current time as it's id
      const newItem = {
        id: Date.now(),
        name: evt.target.value
      };
      // Create a new array with the previous items plus the value the user typed
      const newItems = this.state.items.concat(newItem);
      // Clear the text field
      evt.target.value = '';
      // Set the new state
      this.setState({items: newItems});
    }
  }

  // Called when the user Clicks on a shopping item
  _handleRemove (evt) {
    const pos = evt.target.getAttribute('data-pos');
    // Create a new array without the clicked item
    const newItems = this.state.items;
    newItems.splice(pos, 1);
    // Set the new state
    this.setState({items: newItems});
  }

  render () {
    let shoppingItems = this.state.items.map(
      (item, i) => (
        <div
          key={item.id}
          data-pos={i}
          className='item'
          onClick={this.handleRemove}>
          {item.name}
        </div>
      )
    );
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={5000}>
          {shoppingItems}
        </ReactCSSTransitionGroup>
        <input type='text'
          value={this.state.newItem}
          onKeyDown={this.handleChange}/>
      </div>
    );
  }
}

export default ShoppingListContainer;
