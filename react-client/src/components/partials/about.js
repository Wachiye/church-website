import React, { Component} from 'react';
import { Link } from  'react-router-dom';

export default class About extends Component{
    render() {
        return(
            <section id="about">
                <div className="container">
                    <div className="row" >
                        <div className="col-md-10 offset-md-1">
                            <h2 className="section-title">About Us</h2>
                            <p className="lead">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti quasi tempora deserunt, quas odio laudantium excepturi temporibus suscipit atque nam!
                            </p>
                            <Link to="/about-us" className="call-link">Read More</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}