import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import Home from 'views/HomeView/Home';
import Contact from 'views/ContactView/Contact';
import ShoppingList from 'views/ShoppingListView/ShoppingList';
import Snacks from 'views/SnacksView/Snacks';
import About from 'views/ReposView/About';
import Repos from 'views/ReposView/Repos';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} />
    <Route path='contact' component={Contact} />
    <Route path='shop' component={ShoppingList} />
    <Route path='snacks' component={Snacks} />
    <Route path='about' component={About} />
    <Route path='repos' component={Repos} />
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
