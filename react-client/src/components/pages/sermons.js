import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import SermonDataService from "../../services/sermon";

export default class Sermons extends Component{
    state = {
        sermons : []
    }

    async componentDidMount(){
        let sermons = await SermonDataService.getAll();

        this.setState({
            sermons: sermons.data
        });

        console.log(this.state.sermons)
    }

    render() {
        
        if(this.state.sermons.length === 0){
            return (
                <section id='sermons'>
                    <h1 className='section-title'>Sermons</h1>
                    <div className='container'>
                        <p className='text-danger'>Opps! No sermons yet.</p>
                    </div>
                </section>
            )
        }
        else
            return (
                <section id='sermons'>
                    <h1 className='section-title'>Sermons</h1>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 offset-md-1'>
                                {this.state.sermons.map(sermon => {
                                    return(
                                        <div className='card bg-light border-0 shadow mb-2' key={sermon.id}>
                                            <div className='card-body'>
                                                <h2 className='card-title'>{sermon.title}</h2>
                                                <p className='card-text'>{sermon.description.slice(0,100)} ...</p>
                                                <Link to={`/sermons/${sermon.id}`} className='card-link'>Read</Link>
                                                <span className='float-right text-muted'>{`${sermon.createdAt.slice(0,10)}`}</span>
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