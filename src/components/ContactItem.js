import React, {Component, PropTypes} from 'react';
import 'styles/styles.scss';

export class ContactItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  };

  render () {
    return (
      <li>{this.props.name} | {this.props.email}</li>
    );
  }
}

export default ContactItem;
