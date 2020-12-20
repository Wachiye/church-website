import React, { Component } from "react";
import { Link } from "react-router-dom";

import EventDataService from '../../services/event';

export default class Events extends Component{
    state = {
        events:[]
    }

    async componentDidMount(){
        let upcoming_events = await EventDataService.getUpcoming();
        let today_events = await EventDataService.getAll();
        this.setState({
            events: today_events.data,
            
        })
        this.state.events.push(upcoming_events.data)
    }
    render(){
        if(this.state.events.length === 0)
            return(
                <section id='events'>
                    <h1 className='section-title'>Events and Information</h1>
                    <div className='container'>
                        <p className='text-center'>Sorry, but no upcoming events scheduled.</p>
                    </div>
                </section>
            )
        else
            return(
                <section id='events'>
                    <h1 className='section-title'>Events and Information</h1>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 offset-md-1'>
                                <div className='card-columns'>
                                    {this.state.events.map( evt => {
                                        return(
                                            <div className='card' key={evt.id}>
                                                <img src={evt.image} alt='' className='card-img-top img-fluid w-90 m-auto' ></img>
                                                <div className='card-body'>
                                                    <h4 className='card-title'>{evt.title}</h4>
                                                    <p className='card-text'>{evt.description.slice(0,40)}</p>
                                                </div>
                                                <div className='card-footer text-center'>
                                                    <Link to={`/events/${evt.id}`} className='card-link' >Read More</Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
    }
}