/* @flow */
import React, {Component} from 'react';
import KanbanBoardContainer from '../../containers/KanbanBoardContainer';

export class Home extends Component {
  render () {
    return (
      <div className='container'>
        <KanbanBoardContainer />
      </div>
    );
  }
}

export default Home;
