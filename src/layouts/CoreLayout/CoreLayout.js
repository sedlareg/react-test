import React, { PropTypes } from 'react';
import 'styles/core.scss';

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><a href='/' className='myButton'>Kanban Board</a></li>
            <li><a href='/contact' className='myButton'>Contact</a></li>
            <li><a href='/shop' className='myButton'>ShoppingList</a></li>
            <li><a href='/snacks' className='myButton'>Snacks</a></li>
            <li><a href='/about' className='myButton'>About</a></li>
            <li><a href='/repos' className='myButton'>Repos</a></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

export default CoreLayout;
