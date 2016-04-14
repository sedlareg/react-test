/* @flow */
import React, {Component} from 'react';
import ContactsApp from '../../components/ContactsApp';

const contactList = [
  {
    name: 'Thomas Müller',
    email: 't.mueller@web.de'
  },
  {
    name: 'Geraldes Pereira',
    email: 'geraldes@mooneye.de'
  },
  {
    name: 'Milla Hulk',
    email: 'milla.hulk@hotmail.com'
  },
  {
    name: 'Jonna Godzilla',
    email: 'jonna.godzilla@gmx.de'
  },
  {
    name: 'Testname Awesome',
    email: 'awesome@mooneye.de'
  }
];

export class Contact extends Component {
  render () {
    return (
      <div>
        <ContactsApp contacts={contactList} />
      </div>
    );
  }
}

export default Contact;
