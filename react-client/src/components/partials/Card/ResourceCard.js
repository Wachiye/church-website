import React from 'react';
import { Link } from 'react-router-dom'
import * as $ from 'jquery/dist/jquery';

import ResourceDataService from "../../../services/resource";

class ResourceCard extends React.Component{
    constructor(props){
        super(props);

        this.deleteResource = this.deleteResource.bind(this);
    }
    deleteResource(id) {   
         
        ResourceDataService.delete(id)
          .then(res => {
            $('#response-text').addClass('text-success').text(res.data.message );
            //remove resource from List-Resources state.resource
            window.location = '/resources';
          })
          .catch(err => {
            $('#response-text').addClass('text-danger')
            .text( err.response.data.message || "Unknown Server Error. Try again later...");
          });
    }
    render(){
        let {resource} = this.props;
        return (
            <div className='card'>
                <div className='top-right bg-warning small'> Type: {resource.type} </div>
                                            
                <img className='card-img-top' src={`../../src/${resource.image}`} alt='' width='200' />
                <div className='card-body' >
                    <h5 className='card-title'>{resource.title}</h5>
                    <p className='card-text'>{`${resource.description.slice(0,40)}...`}</p>
                    <p className='card-text small'>{resource.createdAt.slice(0,10)}</p>
                </div>
                <div className='card-footer bg-transparent text-center'>
                    <div className='btn-group btn-group-sm'>
                        <Link to={`/resources/view/${resource.id}`} className='btn btn-outline-primary btn-sm'>
                            <i className='fa fa-eye'></i>
                        </Link>
                        <Link to={`/resources/edit/${resource.id}`} id='edit-btn' className='btn btn-outline-success btn-sm '>
                            <i className='fa fa-edit'></i>
                        </Link>
                        <button type='button' className='btn btn-outline-danger btn-sm'
                        onClick={() => this.deleteResource(resource.id)}>
                            <i className='fa fa-trash'></i>
                        </button>   
                    </div>
                </div>
            </div>
        );
    }
};

export default ResourceCard;