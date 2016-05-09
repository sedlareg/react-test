import React, {Component, PropTypes} from 'react';
import CardForm from './CardForm';
class EditCard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object)
  };

  constructor () {
    super();
    this.handleChange = ::this._handleChange;
    this.handleClose = ::this._handleClose;
    this.handleSubmit = ::this._handleSubmit;
  }

  componentWillMount () {
    const card = this.props.cards.find((card) => card.id === this.props.params.card_id);
    this.setState({...card});
  }

  _handleChange (field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit (e) {
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
  }

  _handleClose (e) {
    this.props.history.pushState(null, '/');
  }

  render () {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel='Edit Card'
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}
export default EditCard;
