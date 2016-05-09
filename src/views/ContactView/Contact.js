import React, {Component, PropTypes} from 'react';
import ContactContainer from '../../containers/ContactContainer';

export class Contact extends Component {
  static propTypes = {
    route: PropTypes.object
  };
  render () {
    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <ContactContainer />
      </div>
    );
  }
}

export default Contact;
