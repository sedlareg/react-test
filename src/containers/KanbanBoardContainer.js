/* @flow */
import React, {Component} from 'react';
import update from 'react-addons-update';
import KanbanBoard from 'components/KanbanBoard';
import 'whatwg-fetch';
import {throttle} from 'helpers/utils';
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'sedlareg'
};

export class KanbanBoardContainer extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      cards: []
    };

    this.addTask = ::this._addTask;
    this.deleteTask = ::this._deleteTask;
    this.toggleTask = ::this._toggleTask;
    // this.updateCardStatus = ::this._updateCardStatus;
    // this.updateCardPosition = ::this._updateCardPosition;
    this.updateCardStatus = throttle(::this._updateCardStatus);
    this.updateCardPosition = throttle(::this._updateCardPosition);
    this.persistCardDrag = ::this._persistCardDrag;
  }

  componentDidMount () {
    fetch(API_URL + '/cards', {headers: API_HEADERS})
      .then(
        (response) => response.json()
      )
      .then(
        (responseData) => {
          console.log(responseData);
          this.setState({cards: responseData});
        }
      )
      .catch(
        (error) => {
          console.log('Error fetching and parsing data', error);
        }
      );
  }

  _addTask (cardId, taskName) {
    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    // Create a new task with the given name and a temporary ID
    let newTask = {id: Date.now(), name: taskName, done: false};
    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask]}
      }
    });
    // set the component state to the mutated object
    this.setState({cards: nextState});
    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Throw an error if server response wasn't 'ok'
          // so you can revert back the optimistic changes
          // made to the UI.
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData) => {
        // When the server returns the definitive ID
        // used for the new Task on the server, update it on React
        newTask.id = responseData.id;
        this.setState({cards: nextState});
      })
      .catch((error) => {
        console.log(error);
        this.setState(prevState);
      });
  }

  _deleteTask (cardId, taskId, taskIndex) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          $splice: [[taskIndex, 1]]
        }
      }
    });
    // set the component state to the mutated object
    this.setState({cards: nextState});

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
      .then((response) => {
        if (!response.ok) {
          // Throw an error if server response wasn't 'ok'
          // so you can revert back the optimistic changes
          // made to the UI.
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        this.setState(prevState);
      });
  }

  _toggleTask (cardId, taskId, taskIndex) {
    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    // Save a reference to the task's 'done' value
    let newDoneValue;
    // Using the $apply command, you will change the done value to its opposite
    let nextState = update(
      this.state.cards,
      {
        [cardIndex]: {
          tasks: {
            [taskIndex]: {
              done: {
                $apply: (done) => {
                  newDoneValue = !done;
                  return newDoneValue;
                }
              }
            }
          }
        }
      });
    // set the component state to the mutated object
    this.setState({cards: nextState});
    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    })
      .then((response) => {
        if (!response.ok) {
          // Throw an error if server response wasn't 'ok'
          // so you can revert back the optimistic changes
          // made to the UI.
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        this.setState(prevState);
      });
  }

  _updateCardStatus (cardId, listId) {
    console.log('updateCardStatus');
    // Find the index of the card
    const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    // Get the current card
    const card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
      // set the component state to the mutated object
      this.setState(update(this.state,
        {
          cards: {
            [cardIndex]: {
              status: {
                $set: listId
              }
            }
          }
        })
      );
    }
  }

  _updateCardPosition (cardId, afterId) {
    console.log('_updateCardPosition');
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
      // Find the index of the card
      const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
      // Get the current card
      const card = this.state.cards[cardIndex];
      // Find the index of the card the user is hovering over
      const afterIndex = this.state.cards.findIndex((card) => card.id === afterId);
      // Use splice to remove the card and reinsert it a the new index
      this.setState(update(this.state,
        {
          cards: {
            $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          }
        }));
    }
  }

  _persistCardDrag (cardId, status) {
    // Find the index of the card
    const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    // Get the current card
    const card = this.state.cards[cardIndex];
    fetch(`${API_URL}/cards/${cardId}`,
      {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify({status: card.status, row_order_position: cardIndex})
      })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          // Throw an error if server response wasn't 'ok'
          // so you can revert back the optimistic changes
          // made to the UI.
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        this.setState(update(this.state,
          {
            cards: {
              [cardIndex]: {
                status: {
                  $set: status
                }
              }
            }
          })
        );
      });
  }

  render () {
    return (
      <div>
        <KanbanBoard
          cards={this.state.cards}
          taskCallbacks={{
            toggle: this.toggleTask,
            delete: this.deleteTask,
            add: this.addTask
          }}
          cardCallbacks={{
            updateStatus: this.updateCardStatus,
            updatePosition: this.updateCardPosition,
            persistCardDrag: this.persistCardDrag
          }}
        />
      </div>
    );
  }
}
export default KanbanBoardContainer;
