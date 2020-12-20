import React, { Component } from "react";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.Admin.css";

import Navbar from "./components/partials/Nav/navbar";
import Home from "./components/partials/home";
import AboutUs from "./components/pages/about-us";
import Events from "./components/pages/events";
import EventView from "./components/pages/event.view";
import Sermons from "./components/pages/sermons";
import SermonView from "./components/pages/sermon.view";
import Resources from "./components/pages/resources";
import Donations from "./components/pages/donation";
import ContactUs from "./components/pages/contact-us";
import Ministries from "./components/pages/ministries";
import PrivacyPolicy from "./components/pages/privacy-policy";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Footer from "./components/partials/Footer/footer";

import AdminNav from "./components/partials/Nav/nav";
import AdminHeader from "./components/partials/Header/admin.header";
import AdminFooter from "./components/partials/Footer/admin.footer";
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
import Church from "./components/church/church";

import PageNotFound from "./components/partials/page-not-found";

export default class App extends Component {
  render() {
    if(localStorage.getItem('access_token') !== null){
      
      return (
          <Router basename='/admin'>
            <div id='main-panel'>
              <AdminNav />
              <AdminHeader />
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
                <Route path='/church/' exact component={Church} />
                <Route path='/settings' exact component={Settings} />
                <Route path='*' exact component={PageNotFound}  />
              </Switch>
              <AdminFooter />
            </div>
          </Router>
        );
    }
    else{
      return (
        <Router>
          <Navbar />
          <Switch>
            <Route path='/'  exact component={Home} />
            <Route path='/about-us' exact component={AboutUs} />
            <Route path='/events' exact component={Events} />
            <Route path='/events/:id' exact component={EventView} />
            <Route path='/sermons' exact component={Sermons} />
            <Route path='/sermons/:id' exact component={SermonView} />
            <Route path='/resources' exact component={Resources} />
            <Route path='/donations' exact component={Donations} />
            <Route path='/contact-us' exact component={ContactUs} />
            <Route path='/ministries' exact component={Ministries} />
            <Route path='/privacy-policy' exact component={PrivacyPolicy} />
            <Route path='/login' exact component={Login} />
            <Route path='/admin/*' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='*' exact component={PageNotFound} />
          </Switch>
          <Footer />
        </Router>
      );
    }
  }
}
