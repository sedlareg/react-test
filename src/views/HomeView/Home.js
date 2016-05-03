/* @flow */
import React, {Component} from 'react';
import KanbanBoardContainer from '../../containers/KanbanBoardContainer';

export class HomeView extends Component {
  render () {
    return (
      <div>
        <KanbanBoardContainer />
      </div>
    );
  }
}

export default HomeView;
