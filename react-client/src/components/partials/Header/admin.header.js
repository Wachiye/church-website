import React, { Component} from 'react';
import { Link } from  'react-router-dom';
import * as $ from 'jquery/dist/jquery.slim';
export default class Header extends Component{
    showProfileMenu(){
        $('#profile-menu').toggleClass('d-none');
    }
    showSideMenu(){
        $('#admin-nav').toggleClass('active');
    }
    render(){
        return (
            <div id="admin-header">
                <div id="burger" className='d-md-none' onClick={this.showSideMenu}>
                    <i className='fa fa-bars'></i>
                </div>
                <div className="page-name d-none d-md-block">
                    <h4>Admin Panel</h4>
                </div>
                <div className=" mr-2 notifications btn-group">
                    <Link to="/messages" className="btn btn-primary btn-sm" title={`14 New Messages`}>
                        <i className='fa fa-envelope mr-1'></i>
                        <span className="badge bg-danger text-light">14</span>
                    </Link>
                    <Link to="/users?filter=today" className="btn btn-secondary btn-sm" title={`8 New Users`}>
                        <i className='fa fa-user-plus mr-1'></i>
                        <span className="badge bg-danger text-light">8</span>
                    </Link>
                    <Link to="/donations" className="btn btn-info btn-sm" title={`14 Recent Donations`}>
                        <i className='fa fa-money mr-1'></i>
                        <span className="badge bg-danger text-light">14</span>
                    </Link>
                    <img src="/favicon.ico" alt="" className="img-circle" width="40" height="40" />
                    <span className="dot-bar" onClick={this.showProfileMenu}>...</span>
                    <div className="profile-menu tex-left d-none " id='profile-menu'>
                        <ul className="list-unstyled p-1 text-light">
                            <li>
                                <a href="/admin/profile#info" >
                                    <i className='fa fa-user'></i> Edit Details
                                </a>
                            </li>
                            <li>
                                <a href="/admin/profile#security" >
                                    <i className='fa fa-user-secret'></i> Change Password
                                </a>
                            </li>
                            <li>
                                <a href="/admin/profile/del" >
                                    <i className='fa fa-user-times'></i> Delete Account
                                </a>
                            </li>
                            <li>
                                <a href="/logout" >
                                    <i className='fa fa-sign-out'></i> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}