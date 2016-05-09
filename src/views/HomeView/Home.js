/* @flow */
import React, {Component, PropTypes} from 'react';
import KanbanBoardContainer from '../../containers/KanbanBoardContainer';

export class Home extends Component {
  static propTypes = {
    route: PropTypes.object
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <KanbanBoardContainer />
      </div>
    );
  }
}

export default Home;
