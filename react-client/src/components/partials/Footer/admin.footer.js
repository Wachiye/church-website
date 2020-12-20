import React, { Component} from 'react';

export default class Footer extends Component{
    render(){
        return (
            <div id='admin-footer'>
                <div className='container'>
                    <div className='row py-1'>
                        <div className='col'>
                        Copyright &copy; {`2020 - ${new Date().getFullYear()}`}
                        </div>
                        <div className='col'>
                            <div className='float-right'>
                                <p>Admin: 
                                    <a href='mailto:siranjofuw@gmail.com?Subject=Church%20Website%20Contact'>siranjofuw@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}