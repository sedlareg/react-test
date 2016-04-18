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

  _toogleTask () {
    console.log('toogleTask');
  };

  _removeTask () {
    console.log('removeTask');
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
      (task, index) => (
        <div key={index}
          className='checklist__task'>
          <Checkbox
            label={''}
            style={styles.checkbox}
            defaultChecked={task.done}
            onCheck={this.toogleTask}
          />
          <span style={styles.spanElement}>{task.name}</span>
          <RaisedButton
            label='Task entfernen'
            style={styles.link}
            onMouseDown={this.removeTask}
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
