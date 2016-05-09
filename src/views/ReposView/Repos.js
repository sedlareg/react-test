import React, { Component, PropTypes } from 'react';
import ReposContainer from 'containers/ReposContainer';

class Repos extends Component {
  static propTypes = {
    route: PropTypes.object
  };

  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <ReposContainer />
      </div>
    );
  }
}
export default Repos;
