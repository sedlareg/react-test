import React, {Component, PropTypes} from 'react';
import 'styles/styles.scss';

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
            <input type='text'
              value={this.props.draftCard.title}
              onChange={() => this.handleChange(this, 'title')}
              placeholder='Title'
              required
              autoFocus />
            <textarea value={this.props.draftCard.description}
              onChange={() => this.handleChange(this, 'description')}
              placeholder='Description'
              required />
            <label htmlFor='status'>Status</label>
            <select id='status'
              value={this.props.draftCard.status}
              onChange={() => this.handleChange(this, 'status')}>
              <option value='todo'>To Do</option>
              <option value='in-progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
            <br />
            <label htmlFor='color'>Color</label>
            <input id='color'
              value={this.props.draftCard.color}
              onChange={() => this.handleChange(this, 'color')}
              type='color'
              defaultValue='#ff0000'/>
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
