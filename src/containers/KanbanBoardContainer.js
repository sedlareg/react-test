/* @flow */
import React, {Component} from 'react';
import update from 'react-addons-update';
import KanbanBoard from 'components/KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'any-string-you-like'
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
        tasks: { $push: [newTask] }
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
        />
      </div>
    );
  }
}

export default KanbanBoardContainer;