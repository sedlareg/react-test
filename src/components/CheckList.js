/* @flow */
import React, {Component, PropTypes} from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';

export class CheckList extends Component {
  static propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
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
          />
          <span style={styles.spanElement}>{task.name}</span>
          <RaisedButton
            label='Task entfernen'
            style={styles.link}/>
        </div>
      )
    );

    return (
      <div className='checklist'>
        {tasks}
        <input
          type='text'
          className='checklist--add-task'
          placeholder='Type then hit Enter to add a new task' />
      </div>
    );
  }
}

export default CheckList;
