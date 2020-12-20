import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component{

    render() {
        return (
            <section id="footer">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-2 logo">
                            <img src="/favicon.ico"  alt='logo' width='64' height='64'/>
                        </div>
                        <div className="col-sm-4 company">
                            <h5>Church Website</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/about-us">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-3 support">
                            <h5>Follow Us</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="#" target='_blank'>Facebook</Link>
                                </li>
                                <li>
                                    <Link to="#" target='_blank'>Twitter</Link>
                                </li>
                                <li>
                                    <Link to="#" target='_blank'>Instagram</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-3 support">
                            <h5>Support</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/ministries">Ministries</Link>
                                </li>
                                <li>
                                    <Link to="/resources">Resources</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}