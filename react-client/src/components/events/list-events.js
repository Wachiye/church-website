import React , {Component} from 'react'
import { Link } from 'react-router-dom'
import EventDataService from '../../services/event';
import Alert from '../partials/alert';
import ErrorCard from '../partials/Card/ErrorCard';

export default class ListEvents extends Component{
    state={
        events:[],
        error:{},
    }
    constructor(props){
        super(props);
        this.retrieveEvents = this.retrieveEvents.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteAllEvents = this.deleteAllEvents.bind(this);
    }
    componentDidMount(){
        this.retrieveEvents();
    }
    retrieveEvents() {
        EventDataService.getAll()
          .then(res => {
            this.setState({
              events: res.data,
              error: res.error
            });
            console.log(res.error);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
    refreshList() {
        this.retrieveEvents();
    }

    deleteEvent(id) {    
        EventDataService.delete(id)
          .then(res => {

            this.setState({
                events : this.state.events.filter(e=> e.id !== id)
            })
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteAllEvents() {
        EventDataService.deleteAll()
          .then(res => {
            setTimeout(()=>{
                Alert('success','Deleted', res.data.message);
            },2000);
          })
          .then(
              this.refreshList()
          )
          .catch(e => {
            console.log(e);
          });
    }
    
    render() {
        let {events, error} = this.state;
        if(error){
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='/events/add' className='btn btn-primary btn-sm' title='Add Event'>
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
                                <div className="card-header">List of events {` (${this.state.events.length})`}
                                    <div className='float-right'>
                                        <div className='btn-group btn-group-sm'>
                                            <Link to='/events/add' className='btn btn-success btn-sm' title='Add Event'>
                                                <i className='fa fa-plus'></i>
                                            </Link>
                                            <button className='btn btn-danger btn-sm'  onClick={this.deleteAllEvents} title='Delete All'>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <table className="table table-bordered table-responsive">
                                        <thead>
                                            <tr>
                                            <th>Title</th>
                                                <th>Description</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {events.map((evt, index) =>{
                                                return(
                                                    <tr key={evt.id}>
                                                        <td>{evt.title}</td>
                                                        <td>{evt.description}</td>
                                                        <td>{evt.from.slice(0,10)}</td>
                                                        <td>{evt.to.slice(0,10)}</td>
                                                        <td>Active</td>
                                                        <td className='text-center'>
                                                            <div className='btn-group btn-group-sm'>
                                                                <Link to={`/events/edit/${evt.id}`} className='btn btn-info btn-sm' event={evt} title='Edit'>
                                                                    <i className='fa fa-edit'></i>
                                                                </Link>
                                                                <button className='btn btn-danger btn-sm' 
                                                                onClick={() => this.deleteEvent(evt.id)} key={index} title='Delete'>
                                                                    <i className='fa fa-trash'></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <ul className='pagination pagination-sm float-right'>
                                        <p className='page-title mr-1'>Items/Page</p>
                                        <li className='page-item'>
                                            <input className='form-control form-control-sm'
                                                id='limit' name='limit' type='number' min='5' max='100' defaultValue='20' step='5'></input>
                                        </li>
                                        <li className='page-item'>
                                            <Link to='/events/page' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/events/page' className='page-link'>Next</Link>
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