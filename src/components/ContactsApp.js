/* @flow */
import React, {Component, PropTypes} from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import 'styles/styles.scss';

export class ContactsApp extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
  };

  constructor () {
    super();
    this.state = {
      filterText: ''
    };
    this.handleUserInput = ::this._handleUserInput;
  }

  _handleUserInput (searchTerm) {
    this.setState({filterText: searchTerm});
  };

  render () {
    return (
      <div className='app'>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <ContactList
          filterText={this.state.filterText}
          contacts={this.props.contacts} />
      </div>
    );
  }
}

export default ContactsApp;
