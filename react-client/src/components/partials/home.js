import React, { Component} from 'react';
import Header from "./Header/admin.header";
import About from "./about";
import QuickLinks from "./quick-links";
import UpcomingEvents from "./upcoming-events";
import RecentSermons from "./recent-sermons";

export default class Home extends Component{
    render(){
        return(
            <div>
                <Header />
                <About />
                <QuickLinks />
                <UpcomingEvents />
                <RecentSermons />
            </div>
        );
    }
}