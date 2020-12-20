import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.Admin.css";

import Nav from "./components/partials/admin/nav";
import Header from "./components/partials/admin/header";
import Footer from "./components/partials/admin/footer";
import Dashboard from "./components/pages/admin/dashboard";
import ListEvents from "./components/events/list-events";
import AddEvent from "./components/events/add-event";
import EditEvent from "./components/events/edit-event";
import ListSermons from "./components/sermons/list-sermons";
import AddSermon from "./components/sermons/add-sermon";
import EditSermon from "./components/sermons/edit-sermon";
import ListMinistries from "./components/ministries/list-ministries";
import AddMinistry from "./components/ministries/add-ministry";
import EditMinistry from "./components/ministries/edit-ministry";
import ListMessages from "./components/messages/list-messages";
import AddMessage from "./components/messages/add-message";
import EditMessage from "./components/messages/edit-message";
import ListUsers from "./components/users/list-users";
import AddUser from "./components/users/add-user";
import EditUser from "./components/users/edit-user";
import ListDonations from './components/donations/list-donations';
import AddDonation from "./components/donations/add-donation";
import ListResources from "./components/resources/list-resources";
import AddResource from "./components/resources/add-resource";
import EditResource from "./components/resources/edit-resource";
import Profile from "./components/pages/admin/profile";
import Settings from "./components/pages/admin/settings";
import ListChurches from "./components/church/list-churches";
import AddChurch from "./components/church/add-church";
import EditChurch from "./components/church/edit-church";
import Login from "./components/pages/login";
import auth from "./services/auth";

export default class AppAdmin extends Component { 
  render() {
    if(auth.isAuthenticated){
      return (
          <Router basename='/admin'>
            <Nav />
            <Header />
            <Switch>
              <Route path='/' exact component={Dashboard} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/events/' exact component={ListEvents} />
              <Route path='/events/add' exact component={AddEvent} />
              <Route path='/events/edit/:id' exact component={EditEvent} />
              <Route path='/sermons/' exact component={ListSermons} />
              <Route path='/sermons/add' exact component={AddSermon} />
              <Route path='/sermons/edit/:id' exact component={EditSermon} />
              <Route path='/ministries/' exact component={ListMinistries} />
              <Route path='/ministries/add' exact component={AddMinistry} />
              <Route path='/ministries/edit/:id' exact component={EditMinistry} />
              <Route path='/messages/' exact component={ListMessages} />
              <Route path='/messages/add' exact component={AddMessage} />
              <Route path='/messages/edit/:id' exact component={EditMessage} />
              <Route path='/users/' exact component={ListUsers} />
              <Route path='/users/add' exact component={AddUser} />
              <Route path='/users/edit/:id' exact component={EditUser} />
              <Route path='/donations/' exact component={ListDonations} />
              <Route path='/donations/add' exact component={AddDonation} />
              <Route path='/resources/' exact component={ListResources} />
              <Route path='/resources/add' exact component={AddResource} />
              <Route path='/resources/edit/:id' exact component={EditResource} />
              <Route path='/profile' exact component={Profile} />
              <Route path='/church/' exact component={ListChurches} />
              <Route path='/church/add' exact component={AddChurch} />
              <Route path='/church/edit/:id' exact component={EditChurch} />
              <Route path='/settings' exact component={Settings} />
            </Switch>
            <Footer />
          </Router>
        );
    }
    else
      return(
        <div>
          <Login />
        </div>
      )
  }
}