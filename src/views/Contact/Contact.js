/* @flow */
import React, {Component} from 'react';
import ContactsApp from '../../components/ContactsApp';
import 'whatwg-fetch';

export class Contact extends Component {
  constructor () {
    super();
    this.state = {
      contacts: []
    };
  }

  componentDidMount () {
    fetch('./contacts.json')
    .then(
      (response) => response.json()
    )
    .then(
      (responseData) => {
        console.log(responseData);
        this.setState({contacts: responseData});
      }
    )
    .catch(
      (error) => {
        console.log('Error fetching and parsing data', error);
      }
    );
  }

  render () {
    return (
      <div>
        <ContactsApp contacts={this.state.contacts} />
      </div>
    );
  }
}

export default Contact;
