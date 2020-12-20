import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import SermonDataService from "../../services/sermon";

export default class SermonView extends Component{
    state = {
        sermon : {},
        sermons: []
    }

    async componentDidMount(){
        let id = this.props.match.params.id;

        let sermons = await SermonDataService.getAll();
        
        this.setState({
            sermons: sermons.data,
            sermon: sermons.data.filter(s => s.id === id)[0]
        });
    }

    render() {
        
        if(!this.state.sermon.id){
            return (
                <section id='sermons'>
                    <h1 className='section-title'>Sermons</h1>
                    <div className='container'>
                        <p className='text-danger'>Sorry but we could not find the specified sermons</p>
                    </div>
                </section>
            )
        }
        else
            return (
                <section id='sermons'>
                    <h1 className='text-center section-title'>Sermons</h1>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mb-2'>
                               <h3 className='text-primary text-uppercase'>{this.state.sermon.title}</h3>
                               <p className='lead'>
                                   {this.state.sermon.description}
                                   <span className='text-danger'>{this.state.sermon.verse || ''}</span>
                               </p> 
                               <hr className='my-2' />
                               <div className='sermon-content' dangerouslySetInnerHTML={{ __html:this.state.sermon.content}}></div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <h3 className='text-center'>Other Sermons</h3>
                                {this.state.sermons.map(sermon => {
                                    return(
                                        <div className='card bg-light border-0 shadow mb-2' key={sermon.id}>
                                            <div className='card-body'>
                                                <h2 className='card-title'>{sermon.title}</h2>
                                                <p className='card-text'>{sermon.description.slice(0,100)} ...</p>
                                                <span className='float-left text-muted'>{`${sermon.createdAt.slice(0,10)}`}</span>
                                                <Link to={`/sermons/${sermon.id}`} className=' float-right card-link'>Read</Link>
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