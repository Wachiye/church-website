import React from 'react';
import * as $ from 'jquery/dist/jquery.slim';

class ErrorCard extends React.Component{
    constructor(props){
        super(props);
        this.closeError = this.closeError.bind(this);
    }
    closeError(e){
        e.preventDefault();
        $('.err-card').addClass('d-none');
    }
    render(){
        let {error} = this.props;
        return (
            <div className='card err-card' >
                <div className='card-body'>
                    <div className='container-fluid'>
                        <div className='row error'>
                            <div className='col-4 text-danger d-flex-column'>
                                <span className='spinner-grow spinner-grow-sm err-icon text-light'>
                                    <i className='fa fa-exclamation-triangle text-danger'></i>
                                </span>
                            </div>
                            <div className='col-8 err-body'>
                                <h5 className='card-title text-uppercase err-title'>{error.name}</h5>
                                <h6 className='card-subtitle err-subtitle' >
                                    {`The server responded with a status of ${error.code}`}
                                </h6>
                            </div>
                        </div>
                        <div className='row my-1'>
                            <div className='col'>
                                <p className='card-text err-message'>{error.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
}

export default ErrorCard;