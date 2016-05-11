import React, {Component, PropTypes} from 'react';
import 'styles/styles.scss';
import Icon from 'components/Icon';

class CardForm extends Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftCard: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      color: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleChange = ::this._handleChange;
    this.handleClose = ::this._handleClose;
    this.handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit (e) {
    this.props.handleSubmit(e);
  }

  _handleChange (e, field) {
    console.log(field, e);
    this.props.handleChange(field, e.target.value);
  }

  _handleClose (e) {
    e.preventDefault();
    this.props.handleClose();
  }

  render () {
    return (
      <div>
        <div className='card big'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Icon icon='price-tags' viewbox='0 0 40 32'/>
              <input type='text'
                className='feedback-input'
                value={this.props.draftCard.title}
                onChange={() => this.handleChange(this, 'title')}
                placeholder='Title'
                required
                autoFocus />
            </div>
            <div>
              <Icon icon='file-text' viewbox='0 50 32 32' />
              <textarea value={this.props.draftCard.description}
                className='feedback-input'
                onChange={() => this.handleChange(this, 'description')}
                placeholder='Description'
                required />
            </div>
            <div>
              <Icon icon='priority_high' viewbox='0 0 52 52'/>
              <select id='status'
                value={this.props.draftCard.status}
                onChange={() => this.handleChange(this, 'status')}>
                <option value='todo'>To Do</option>
                <option value='in-progress'>In Progress</option>
                <option value='done'>Done</option>
              </select>
            </div>
            <div>
              <Icon icon='droplet' viewbox='0 0 48 48'/>
              <input id='color'
                value={this.props.draftCard.color}
                onChange={() => this.handleChange(this, 'color')}
                type='color'
                defaultValue='#ff0000'/>
            </div>
            <div className='actions'>
              <button type='submit'>{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className='overlay' onClick={this.handleClose}>
        </div>
      </div>
    );
  }
}
export default CardForm;
