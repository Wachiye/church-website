import React , {Component} from 'react'
import { Link } from 'react-router-dom'

import SermonDataService from '../../services/sermon';

import Modal from '../partials/Modal/Modal';
import ErrorCard from '../partials/Card/ErrorCard';

export default class ListSermons extends Component{
    state = {
        sermons: [],
        error: {}
    }

    constructor(props){
        super(props);

        this.retrieveSermons = this.retrieveSermons.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteSermon = this.deleteSermon.bind(this);
        this.deleteAllSermons = this.deleteAllSermons.bind(this);
    }

    componentDidMount(){
        this.retrieveSermons();
    }
    retrieveSermons() {
        SermonDataService.getAll()
          .then(res => {
              console.log(res)
            this.setState({
              sermons: res.data,
              error: res.error
            });
        })
      }
    
    refreshList() {
        this.retrieveSermons();
    }


    deleteSermon(id) {    
        SermonDataService.delete(id)
          .then(res => {
            this.setState({
                sermons : this.state.sermons.filter(e=> e.id !== id)
            });
            window.location = '/admin/sermons'
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteAllSermons() {
        SermonDataService.deleteAll()
          .then(res => {
              this.refreshList();
          });
    }
    render() {
        const {sermons, error} = this.state;
        if(error){
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='/sermons/add' className='btn btn-primary btn-sm' title='Add Event'>
                            <i className='fa fa-plus'> Add</i>
                        </Link>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshList} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">List of Sermons
                                    <div className='float-right'>
                                        <div className='btn-group btn-group-sm'>
                                            <Link to='/sermons/add' className='btn btn-success btn-sm' title='Add'>
                                                <i className='fa fa-plus'></i>
                                            </Link>
                                            <button  className='btn btn-danger btn-sm' onClick={this.deleteAllSermons} title='Delete All'>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                           <th>Title</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sermons.map( (sermon, index) => {
                                            return(
                                                <tr key={sermon.id}>
                                                    <td>{sermon.title}</td>
                                                    <td>{`${sermon.description.slice(0,40)}...`}</td>
                                                    <td>{sermon.createdAt.slice(0,10)}</td>
                                                    <td className='text-center'>
                                                        <div className='btn-group btn-group-sm'>
                                                            <a href={`#sermon-${index}`} className='btn btn-primary btn-sm'
                                                                data-toggle='modal' data-target={`#sermon-${index}`}>
                                                                <i className='fa fa-eye'></i>
                                                            </a>
                                                            <Link to={`/sermons/edit/${sermon.id}`} className='btn btn-success btn-sm' title='Edit'>
                                                                <i className='fa fa-edit'></i>
                                                            </Link>
                                                            <button className='btn btn-danger btn-sm' 
                                                            onClick={() => this.deleteSermon(sermon.id)} key={sermon.id} title='Delete'>
                                                                <i className='fa fa-trash'></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    
                                                </tr>
                                                
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div id='sermons-modal'>
                                    {sermons.map((sermon, index)=>{
                                        return(
                                            <Modal key={sermon.id} id={`sermon-${index}`} output={sermon.content} title={sermon.title}index={index} />
                                            
                                        )
                                    })}
                                </div>
                                
                                <div className="card-footer">
                                    <ul className='pagination pagination-sm float-right'>
                                        <p className='page-title mr-1'>Items/Page</p>
                                        <li className='page-item'>
                                            <input className='form-control form-control-sm'
                                                id='limit' name='limit' type='number' min='5' max='100' defaultValue='20' step='5'></input>
                                        </li>
                                        <li className='page-item'>
                                            <Link to='/sermons/page' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/sermons/page' className='page-link'>Next</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}