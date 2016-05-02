import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import Contact from 'views/Contact/Contact';
import ShoppingList from 'views/ShoppingList/ShoppingList';
import Snacks from 'views/Snacks/Snacks';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='contact' component={Contact} />
    <Route path='shop' component={ShoppingList} />
    <Route path='snacks' component={Snacks} />
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
