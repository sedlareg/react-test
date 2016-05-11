import React, {Component, PropTypes} from 'react';

class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    viewbox: PropTypes.string.isRequired
  };

  render () {
    return (
      <svg viewBox={this.props.viewbox} className={`icon icon-${this.props.icon}`}>
        <use xlinkHref={`/sprite.svg#icon-${this.props.icon}`}/>
      </svg>
    );
  }
}
export default Icon;
