import React, { Component} from 'react';
import MinistryDataService from '../../services/ministry';


export default class Ministries extends Component{
    state={
        ministries: []
    }

    async componentDidMount(){
        let ministries = await MinistryDataService.getAll();

        this.setState({
            ministries:  ministries.data
        })

    }

    render(){
        return (
            <section id="ministries">
                <h1 class="section-title">Ministries</h1>
                <div class="container">
                    <Ministry ministries={this.state.ministries} />
                </div>
            </section>
        )
    }
}
class Ministry extends React.Component {
    render(){
        return (
            this.props.ministries.map( ( ministry, index) => {
                if(index % 2 === 0) 
                    return (<EvenMinistry ministryData={ministry} />)
                else
                    return(<OddMinistry ministryData={ministry} />)
                    
            })
        )
    }
}

class EvenMinistry extends React.Component{
    render(){
        let ministry = this.props.ministryData;
        return(
            <div className='row'>
                <div className="col-md-4">
                    <img src={ministry.image} alt="" className="img-responsive img-fluid w-100"></img>
                </div>
                <div className="col-md-8">
                    <h2 className="section-title">{ministry.name}</h2>
                    <p className="lead">{ministry.description}</p>
                </div>
            </div>
        )
    }
}

class OddMinistry extends React.Component{
    render(){
        let ministry = this.props.ministryData;
        return(
            <div className='row'>
                <div className="col-md-8">
                    <h2 className="section-title">{ministry.name}</h2>
                    <p className="lead">{ministry.description}</p>
                </div>
                <div className="col-md-4">
                    <img src={ministry.image} alt="" className="img-responsive img-fluid w-100"></img>
                </div>
            </div>
        )
    }
}