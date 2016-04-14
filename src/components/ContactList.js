import React, {Component, PropTypes} from 'react';
import ContactItem from './ContactItem';
import 'styles/styles.scss';

export class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    filterText: PropTypes.string.isRequired
  };

  render () {
    const filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );
    return (
      <ul>
        {filteredContacts.map(
          (contact, index) =>
            <ContactItem
              key={index}
              name={contact.name}
              email={contact.email}
            />
        )}
      </ul>
    );
  }
}

export default ContactList;
