import React , {Component}  from 'react';
import { Link}from 'react-router-dom';
import auth from '../../../services/auth';
import * as $ from 'jquery/dist/jquery.slim';

export default class Nav extends Component{
    showSideMenu(){
        $('#admin-nav').toggleClass('active');
    }

    logout(){
        auth.logout();
    }
    
    render() {
        return (
            <div id="admin-nav" >
                <div id="burger" className='d-md-none top-right' onClick={this.showSideMenu}>
                    <i className='fa fa-times-rectangle'></i>
                </div>
                <div className="nav-profile text-center">
                    <img src="/favicon.ico" alt="" width="60" height="60" className="img-circle" ></img>
                    <h4 className="profile-name">Full Name
                        <small className="profile-username">@username</small>
                    </h4> 
                </div>
                <hr className="my-1 bg-light" />
                <ul className="nav-list nav">
                    <li className="nav-item nav-list-item">
                        <Link to="/dashboard" className="nav-link nav-list-link fa fa-tachometer"> Dashboard </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/events" className="nav-link nav-list-link fa fa-tasks"> Events </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/sermons" className="nav-link nav-list-link fa fa-graduation-cap"> Sermons </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/ministries" className="nav-link nav-list-link fa fa-group"> Ministries </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/messages" className="nav-link nav-list-link fa fa-envelope"> Messages 
                            <span className="badge bg-danger text-light">14</span>
                        </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/users" className="nav-link nav-list-link fa fa-users"> Users 
                            <span className="badge bg-danger text-light">8</span>
                        </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/donations" className="nav-link nav-list-link fa fa-money"> Donations 
                            <span className="badge bg-danger text-light">14</span>
                        </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/resources" className="nav-link nav-list-link fa fa-book"> Resources 
                            <span className="badge bg-danger text-light">14</span>
                        </Link>
                    </li>
                    <hr className='my-1' />
                    <li className="nav-item nav-list-item">
                        <Link to="/profile" className="nav-link nav-list-link fa fa-user"> Profile </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/church" className="nav-link nav-list-link"> Church Details </Link>
                    </li>
                    <li className="nav-item nav-list-item">
                        <Link to="/logout" className="nav-link nav-list-link fa fa-sign-out" onClick={this.logout.bind(this)}> Logout </Link>
                    </li>
                </ul>
            </div>
        )
    }
}