import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import EventDataService from "../../services/event";

export default class EventView extends Component{
    state = {
        targetEvent : {},
        events: []
    }

    async componentDidMount(){
        let id = this.props.match.params.id;
        let events = await EventDataService.getTodayOrUpcoming();
        this.setState({
            events: events.data.filter(e => e.id !== id)[0],
            targetEvent: events.data.filter(e => e.id === id)[0]
        });

    }

    render() {
        if(this.state.events.length === 0)
            return (
                <section id='events'>
                    <h1 className='section-title'>Events and Information</h1>
                    <div className='container'>
                        <p className='text-danger'>Sorry but we could not find the specified events</p>
                    </div>
                </section>
            )
        else
            return (
                <section id='event'>
                    <h1 className='text-center section-title'>Events and Information</h1>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mb-2'>
                                <h2 className='display-4'>{this.state.targetEvent.title}</h2>
                                <p>{`From ${this.state.targetEvent.from.slice(0,10)} -  To ${this.state.targetEvent.to.slice(0,10)}`}</p>
                                <hr className='my-2'/>
                                <div>
                                    <img src={this.state.targetEvent.image} alt='' className='img-fluid'></img>
                                    {this.state.targetEvent.description}
                                </div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <h3 className='text-center'>Other events</h3>
                                {this.state.events.map(evt => {
                                    return(
                                        <div className='card bg-light border-0 shadow mb-2' key={evt.id}>
                                            <div className='card-body'>
                                                <h2 className='card-title'>{evt.title}</h2>
                                                <p className='card-text'>{evt.description.slice(0,15)}</p>
                                                <Link to={`/events/${evt.id}`} className=' float-right card-link'>Read</Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )
        
    }
}