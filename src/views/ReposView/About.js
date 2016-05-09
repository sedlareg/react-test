import React, { Component, PropTypes } from 'react';
class About extends Component {
  static propTypes = {
    route: PropTypes.object
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
      </div>
    );
  }
}

export default About;
