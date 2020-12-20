import React, { Component} from 'react';
import { Link } from  'react-router-dom';

import SermonDataService from '../../services/sermon';

export default class RecentSermons extends Component{

    state = {
        recentSermons:[]
    }

    async componentDidMount(){
        let sermons = await SermonDataService.getAll();

        await this.setState({
            recentSermons: sermons.data
        });

    }
    render() {
        if(this.state.recentSermons.length === 0)
            return null;
        else
            return(
                <section id="recent-sermons">
                    <div className="container">
                        <h1>Recent Sermons</h1>
                        <div className="row recent-sermons">
                            {this.state.recentSermons.map(sermon => {
                                return(
                                    <div className="col-md-3" key={sermon.id}>
                                        <div className="sermon rounded" style={{background:"linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))"}}>
                                            <Link to={`/sermons/${sermon.id}`}>{sermon.title}</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            );
    }
}