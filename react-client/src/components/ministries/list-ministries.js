import React , {Component} from 'react'
import { Link } from 'react-router-dom'

import MinistryDataService from '../../services/ministry';
import ErrorCard  from '../partials/Card/ErrorCard';

export default class ListMinistries extends Component{
    state = {
        ministries: [],
        error: {}
    }

    constructor(props){
        super(props);

        this.retrieveMinistries = this.retrieveMinistries.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteMinistry = this.deleteMinistry.bind(this);
        this.deleteAllMinistries = this.deleteAllMinistries.bind(this);
    }

    componentDidMount(){
        this.retrieveMinistries();
    }
    retrieveMinistries() {
        MinistryDataService.getAll()
          .then(res => {
            this.setState({
              ministries: res.data,
              error: res.error
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
    refreshList() {
        this.retrieveMinistries();
    }


    deleteMinistry(id) {  
        MinistryDataService.delete(id)
          .then(res => {
            this.setState({
                ministries : this.state.ministries.filter(e=> e.id !== id)
            })
            window.location = '/admin/ministries';
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteAllMinistries() {
        MinistryDataService.deleteAll()
          .then(res => {
            window.location = '/admin/ministries';
          })
          .catch(e => {
            console.log(e);
          });
    }
    render() {
        let {ministries, error} = this.state;
        if(error){
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='/ministries/add' className='btn btn-primary btn-sm' title='Add Event'>
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
                                <div className="card-header">List of Ministries
                                    <div className='float-right'>
                                        <div className='btn-group btn-group-sm'>
                                            <Link to='/ministries/add' className='btn btn-success btn-sm'>
                                                <i className='fa fa-plus'></i>
                                            </Link>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={this.deleteAllMinistries}>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>Name</th>
                                                <th>Description</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {ministries.map(ministry => {
                                                return(
                                                    <tr key={ministry.id}>
                                                        <td>{ministry.name}</td>
                                                        <td className='text-wrap'>{ministry.description}</td>
                                                        <td>{ministry.createdAt.slice(0,10)}</td>
                                                        <td>
                                                            <Link to={`/ministries/edit/${ministry.id}`} className='btn btn-info btn-sm'>
                                                                <i className='fa fa-edit'></i>
                                                            </Link>
                                                            <button className='btn btn-danger btn-sm' onClick={()=>this.deleteMinistry(ministry.id)}>
                                                                <i className='fa fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            
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
                                            <Link to='/ministries/page' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/ministries/page' className='page-link'>Next</Link>
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