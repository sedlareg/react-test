/* @flow */
import React, {Component, PropTypes} from 'react';

export class Home extends Component {
  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.element
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        {this.props.children}
      </div>
  );
  }
}

export default Home;
