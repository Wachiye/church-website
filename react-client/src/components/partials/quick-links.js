import React, { Component} from 'react';
import { Link } from  'react-router-dom';

export default class QuickLinks extends Component{
    render() {
        return(
            <section id="quick-links">
                <div className="container">
                    <h1>Quick Links</h1>
                    <div className="row quick-links">
                        <div className="col-md-3 text-center">
                            <Link to="/events">
                                <div className="icon">
                                    <i className="fa fa-calendar"></i>
                                </div>
                                <h2>Events</h2>
                                <p>Church events, planning and schedules</p>
                            </Link>
                        </div>
                        <div className="col-md-3 text-center">
                            <Link to="/ministries">
                                <div className="icon">
                                    <i className="fa fa-music"></i>
                                </div>
                                <h2>Ministries</h2>
                                <p>Youth and children, Bible, Prayer, Adult....</p>
                            </Link>
                        </div>
                        <div className="col-md-3 text-center">
                            <Link to="/resources">
                                <div className="icon">
                                    <i className="fa fa-folder"></i>
                                </div>
                                <h2>Resources</h2>
                                <p>Forms, eBooks, Music, Videos</p>
                            </Link>
                        </div>
                        <div className="col-md-3 text-center">
                            <Link to="/donations">
                                <div className="icon">
                                    <i className="fa fa-bank"></i>
                                </div>
                                <h2>Giving</h2>
                                <p>Tithing, offering and ministry support</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}