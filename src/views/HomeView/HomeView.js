/* @flow */
import React, {Component} from 'react';
import KanbanBoard from '../../components/KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'any-string-you-like'
};

export class HomeView extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      cardList: []
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
          this.setState({cardList: responseData});
        }
      )
      .catch(
        (error) => {
          console.log('Error fetching and parsing data', error);
        }
      );
  }

  _addTask (cardId, taskName) {
    console.log('addTask');
  }

  _deleteTask (cardId, taskId, taskIndex) {
    console.log('deleteTask');
  }

  _toggleTask (cardId, taskId, taskIndex) {
    console.log('toggleTask');
  }

  render () {
    return (
      <div>
        <KanbanBoard
          cards={this.state.cardList}
          taskCallbacks={{
            toogle: this.toggleTask,
            delete: this.deleteTask,
            add: this.addTask
          }}
        />
      </div>
    );
  }
}

export default HomeView;
