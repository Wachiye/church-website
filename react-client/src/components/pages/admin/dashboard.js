import React from 'react';
import { Link } from 'react-router-dom';
export default class Dashboard extends React.Component{
    render(){
        return(
            <div id='main'>
                <div className="card bg-transparent border-info mb-2">
                    <div className="card-body">
                        <h3 className="card-title">Updates</h3>
                        <div className="card-text updates">
                            <div className="update rounded h-100">
                                <img className="img-circle" src="../img/username.png" alt="" width="35" height="35"></img>
                                <h6>New Users</h6>
                                <p>35</p>
                            </div>
                            <div className="update rounded h-100">
                                <img className="img-circle" src="../img/username.png" alt="" width="35" height="35"></img>
                                <h6>Upcoming Events</h6>
                                <p>35</p>
                            </div>
                            <div className="update rounded h-100">
                                <img className="img-circle" src="../img/username.png" alt="" width="35" height="35"></img>
                                <h6>Today Events</h6>
                                <p>35</p>
                            </div>
                            <div className="update rounded h-100">
                                <img className="img-circle" src="../img/username.png" alt="" width="35" height="35"></img>
                                <h6>New Donations</h6>
                                <p>35</p>
                            </div>
                            <div className="update rounded h-100">
                                <img className="img-circle" src="../img/username.png" alt="" width="35" height="35"></img>
                                <h6>New Subscribers</h6>
                                <p>35</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-8 mb-2">
                        <div id='donations-tracking' className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Donations Tracking</h5>
                                <canvas id="donation-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div id="quick-analysis" className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Quick Analysis</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        All Users: 
                                        <span className="pull-right">250</span>
                                    </li>
                                    <li className="list-group-item">
                                        Pastors: 
                                        <span className="pull-right">8</span>
                                    </li>
                                    <li className="list-group-item">
                                        Members:
                                        <span className="pull-right">210</span>
                                    </li>
                                    <li className="list-group-item">
                                        Subscribers:
                                        <span className="pull-right">30</span>
                                    </li>
                                    <li className="list-group-item">
                                        Events:
                                        <span className="pull-right">20</span>
                                    </li>
                                    <li className="list-group-item">
                                        Sermons:
                                        <span className="pull-right">40</span>
                                    </li>
                                    <li className="list-group-item">
                                        Resources:
                                        <span className="pull-right">50</span>
                                    </li>
                                    <li className="list-group-item">
                                        Donation Balance:
                                        <span className="pull-right">50k</span>
                                    </li>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                <div className="col-md-8 mb-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="card-title">Recent Donations Transaction History</h6>
                            <div className="card-text table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead className="bg-dark text-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Amount(Ksh)</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Wachiye Siranjofu</td>
                                            <td>254790983123</td>
                                            <td>500.00</td>
                                            <td>XJT6JKI0N</td>
                                            <td>21-11-2020</td>
                                        </tr>
                                        <tr>
                                            <td>Wachiye Siranjofu</td>
                                            <td>254790983123</td>
                                            <td>500.00</td>
                                            <td>XJT6JKI0N</td>
                                            <td>21-11-2020</td>
                                        </tr>
                                        <tr>
                                            <td>Wachiye Siranjofu</td>
                                            <td>254790983123</td>
                                            <td>500.00</td>
                                            <td>XJT6JKI0N</td>
                                            <td>21-11-2020</td>
                                        </tr>
                                        <tr>
                                            <td>Wachiye Siranjofu</td>
                                            <td>254790983123</td>
                                            <td>500.00</td>
                                            <td>XJT6JKI0N</td>
                                            <td>21-11-2020</td>
                                        </tr>
                                        <tr className="text-center">
                                            <td colSpan="5">
                                                <Link to="#" className="btn btn-dark text-light">View All</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Application Performance</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item ">
                                    <h6>Memory Usage</h6>
                                    <canvas id="memory"></canvas>
                                </li>
                                <li className="list-group-item ">
                                    <h6>Response Evaluation</h6>
                                    <canvas id="response"></canvas>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}