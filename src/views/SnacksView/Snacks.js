/* @flow */
import React, {Component, PropTypes} from 'react';
import SnacksContainer from '../../containers/SnacksContainer';

export class Snacks extends Component {
  static propTypes = {
    route: PropTypes.object
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <SnacksContainer />
      </div>
    );
  }
}

export default Snacks;
