/* @flow */
import React, {Component, PropTypes} from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';

export class CheckList extends Component {
  static propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object)
  };

  constructor () {
    super();
    this.toogleTask = ::this._toogleTask;
    this.removeTask = ::this._removeTask;
    this.checkInputKeyPress = ::this._checkInputKeyPress;
  }

  _toogleTask (task, taskIndex) {
    console.log(task.id);
    console.log(taskIndex);
    this.props.taskCallbacks.toggle(this.props.cardId, task.id, taskIndex);
  };

  _removeTask (task, taskIndex) {
    console.log(task.id);
    console.log(taskIndex);
    this.props.taskCallbacks.delete(this.props.cardId, task.id, taskIndex);
  };

  _checkInputKeyPress (evt) {
    console.log('checkInputKeyPress:' + evt.key);
    if (evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value = '';
    }
  };

  render () {
    const styles = {
      checkbox: {
        height: '18',
        display: 'inline-block',
        width: 'auto'
      },
      spanElement: {
        marginRight: 20
      },
      link: {
        right: 0
      }
    };
    const tasks = this.props.tasks.map(
      (task, taskIndex) => (
        <div key={task.id}
          className='checklist__task'>
          <Checkbox
            label={''}
            style={styles.checkbox}
            defaultChecked={task.done}
            onCheck={() => this.toogleTask(task, taskIndex)}
            // onCheck={this.toogleTask.bind(null, task, taskIndex)}
            // onCheck={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}
          />
          <span style={styles.spanElement}>{task.name}</span>
          <RaisedButton
            label='Task entfernen'
            style={styles.link}
            onMouseDown={() => this.removeTask(task, taskIndex)}
            // onMouseDown={this.removeTask.bind(null, task, taskIndex)}
            // onMouseDown={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}
          />
        </div>
      )
    );

    return (
      <div className='checklist'>
        {tasks}
        <input
          type='text'
          className='checklist--add-task'
          placeholder='Type then hit Enter to add a new task'
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    );
  }
}

export default CheckList;
