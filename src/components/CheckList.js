/* @flow */
import React, {Component, PropTypes} from 'react';

export class CheckList extends Component {
  static propTypes = {
    tasks: PropTypes.array
  };

  render () {
    const tasks = this.props.tasks.map(
      (task, index) => (
        <li key={index}
          className='checklist__task'>
          <input type='checkbox' defaultChecked={task.done} />
          {task.name}
          <a href='#' className='checklist__task--remove' />
        </li>
      )
    );

    return (
      <div className='checklist'>
        <ul>{tasks}</ul>
      </div>
    );
  }
}

export default CheckList;
