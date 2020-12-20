import React, { Component} from 'react';
export default class PageNotFound extends Component{
    render(){
        return (
            <div id="main">
                <div id='four-o-four'>
                    <div className='container'>
                        <h3 className='display-4 text-danger'>404 Page Not Found</h3>
                        <hr className='mt-1'/>
                        <p className='lead'>Sorry but the resource you are trying to access is not reachable. <br/>
                            Please check that your link 
                            <span className='small text-danger mx-1'>
                                {` ${window.location} `}
                            </span>
                            is correct and try again. <br />
                            If the problem persists, contact the admin via  
                            <a href='mailto:siranjofuw@gmail.com?Subject=404%20Page%20Error'> siranjofuw@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}