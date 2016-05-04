/* @flow */
import React, {Component} from 'react';
import ContactContainer from '../../containers/ContactContainer';

export class Contact extends Component {
  render () {
    return (
      <div className='container'>
        <ContactContainer />
      </div>
    );
  }
}

export default Contact;
