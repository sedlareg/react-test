import React, {Component, PropTypes} from 'react';
import CardForm from './CardForm';
import 'styles/styles.scss';

class NewCard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object
  };

  constructor () {
    super();
    this.handleChange = ::this._handleChange;
    this.handleClose = ::this._handleClose;
    this.handleSubmit = ::this._handleSubmit;
  }

  componentWillMount () {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    });
  };

  _handleChange (field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit (e) {
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.pushState(null, '/board');
  }

  _handleClose (e) {
    this.props.history.pushState(null, '/board');
  }

  render () {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel='Create Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}
export default NewCard;
