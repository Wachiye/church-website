import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component{

    render() {
        return (
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container'>
                    <Link to="/" className="navbar-brand">
                        <img className='mr-2' src="/favicon.ico" alt="" width='35' height='35'></img>
                        FCCI-NC
                    </Link>
                    <button className="navbar-toggler" type="button" 
                        data-toggle='collapse' data-target='#navbar_content' aria-controls="navbar_content"
                        aria-expanded="false" aria-label="Menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar_content">
                        <ul className="navbar-nav ml-auto w-75 text-uppercase">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about-us" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/events" className="nav-link">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sermons" className="nav-link">Sermons</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/donations" className="nav-link">Donations</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact-us" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}