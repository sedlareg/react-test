import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import Home from 'views/HomeView/Home';
import Contact from 'views/ContactView/Contact';
import ShoppingList from 'views/ShoppingListView/ShoppingList';
import Snacks from 'views/SnacksView/Snacks';
import About from 'views/ReposView/About';
import KanbanBoardContainer from 'containers/KanbanBoardContainer';
import ReposContainer from 'containers/ReposContainer';
import KanbanBoard from 'components/KanbanBoard';
import RepoDetails from 'components/RepoDetails';
import ServerError from 'components/ServerError';
import NewCard from 'components/NewCard';
import EditCard from 'components/EditCard';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} title='Home' />
    <Route title='Kanban Board' component={KanbanBoardContainer}>
      <Route path='board' component={KanbanBoard}>
        {/* Add the route, nested where we want the UI to nest */}
        <Route path='new' component={NewCard} />
        <Route path='edit/:card_id' component={EditCard} />
      </Route>
    </Route>
    <Route path='contact' title='Contact' component={Contact} />
    <Route path='shop' title='Shopping List' component={ShoppingList} />
    <Route path='snacks' title='Snacks' component={Snacks} />
    <Route path='about' title='About Us' component={About} />
    <Route path='repos' title='Github Repositories' component={ReposContainer}>
      {/* Add the route, nested where we want the UI to nest */}
      <Route path='/repo/:repo_name' component={RepoDetails} />
    </Route>
    <Route path='error' component={ServerError} />
  </Route>
);
//
// <Route path="/" component={App}>
//  {/* Show the dashboard at / */}
//  <IndexRoute component={Dashboard} />
//  <Route path="about" component={About} />
//  <Route path="inbox" component={Inbox}>
//    <Route path="messages/:id" component={Message} />
//  </Route>
// </Route>
