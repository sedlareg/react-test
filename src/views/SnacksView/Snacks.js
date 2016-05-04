/* @flow */
import React, {Component} from 'react';
import SnacksContainer from '../../containers/SnacksContainer';

export class Snacks extends Component {
  render () {
    return (
      <div className='container'>
        <SnacksContainer />
      </div>
    );
  }
}

export default Snacks;
