import React, { Component} from 'react';
//import { Link } from  'react-router-dom';
import EventDataService from '../../services/event';

export default class UpcomingEvents extends Component{
    state = {
        upcomingEvents:[]
    }

    async componentDidMount(){
        let events = await EventDataService.getUpcoming();

        await this.setState({
            upcomingEvents: events.data
        });

    }
    render() {
        if(this.state.upcomingEvents.length === 0)
            return null;
        else
            return(
                <section id="upcoming-events">
                    <div className="container">
                        <h1>Upcoming Events</h1>
                        <div className="row upcoming-events">
                            {this.state.upcomingEvents.map(evt =>{
                                return(
                                    <div className="col-md-4 event border-light" key={evt.id}>
                                        <div className="event-header">
                                            <h2>{evt.title}</h2>
                                            <p>{`${evt.from.slice(0,10)} - ${evt.to.slice(0,10)}`}</p>
                                        </div>
                                        <div className="event-desc">
                                            <p>{evt.description}</p>
                                        </div>
                                        <button className="btn btn-dark">More</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            );
    }
}