import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import ResourceDataService from "../../services/resource";

import ResourceCard from "../partials/Card/ResourceCard";
import ErrorCard from '../partials/Card/ErrorCard';
export default class ListResources extends Component{
    state = {
        resources:[],
        error: {}
    }
    constructor(props){
        super(props);
        this.retrieveResources = this.retrieveResources.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteAllResources = this.deleteAllResources.bind(this);
    }
    componentDidMount(){
        this.retrieveResources();
    }
    retrieveResources() {
        ResourceDataService.getAll()
          .then(res => {
            this.setState({
              resources: res.data,
              error: res.error
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
    refreshList() {
        this.retrieveResources();
    }

    deleteResource(id) {    
        ResourceDataService.delete(id)
          .then(res => {

            this.setState({
                resources : this.state.resources.filter(e=> e.id !== id)
            });

            window.location = '/admin/resources';
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteAllResources() {
        ResourceDataService.deleteAll()
          .then(res => {
            window.location = '/admin/resources'
          })
          .catch(e => {
            console.log(e);
          });
    }
    render() {
        let {resources, error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='/resources/add' className='btn btn-primary btn-sm' title='Add Event'>
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
                <h1 className='section-title'>Resources</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col my-1'>
                            <div className='float-right'>
                                <div className='btn-group btn-group-sm'>
                                    <Link to='/resources/add' className='btn btn-success btn-sm'>
                                        <i className='fa fa-plus'> Add</i>
                                    </Link>
                                    <button  className='btn btn-danger btn-sm' onClick={()=>this.deleteAllResources}>
                                        <i className='fa fa-trash'> Delete All</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {resources.map(resource => {
                            return(
                                <div className='col-sm-6 col-md-4 col-lg-3 mb-1' key={resource.id}>
                                    <ResourceCard  resource={resource} />
                                </div>
                            )
                            
                        })}
                    </div>
                </div>
            </div>
        )
    }
}