import React, {Component, PropTypes} from 'react';
import 'styles/styles.scss';

export class SearchBar extends Component {
  static propTypes = {
    filterText: PropTypes.string.isRequired,
    onUserInput: PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleChange = ::this._handleChange;
  }

  _handleChange (event) {
    this.props.onUserInput(event.target.value);
  }

  render () {
    return (
      <input
        type='search'
        placeholder='search'
        value={this.props.filterText}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchBar;
