import React, { PropTypes } from 'react';
import 'styles/core.scss';
import {Link} from 'react-router';

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
            <li><Link to='/' className='myButton' activeClassName='active'>Flux Transaction</Link></li>
            <li><Link to='/board' className='myButton' activeClassName='active'>Kanban Board</Link></li>
            <li><Link to='/contact' className='myButton' activeClassName='active'>Contact</Link></li>
            <li><Link to='/shop' className='myButton' activeClassName='active'>ShoppingList</Link></li>
            <li><Link to='/snacks' className='myButton' activeClassName='active'>Snacks</Link></li>
            <li><Link to='/about' className='myButton' activeClassName='active'>About</Link></li>
            <li><Link to='/repos' className='myButton' activeClassName='active'>Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

export default CoreLayout;
