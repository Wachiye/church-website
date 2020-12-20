import React, { Component} from 'react';
import { Link } from  'react-router-dom';
import ChurchDataService from "../../../services/church";

export default class Header extends Component{

    state = {
        name: 'Church Website',
        tag: 'We trust God',
        email: 'example@church.com',
        phone: '(254)7-123-45678',
        address: 'Some address',
        bio:"some text about church here",
        church: {}
    }

    async componentDidMount(){
        let church =  await ChurchDataService.getAll();
        
        this.setState({
            church: church.data[0]
        });

    }
    render() {

       return(
            <section id="header" >
                <div className="jumbotron rounded-0" 
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/img/bg-bible.jpeg')",
                    backgroundSize:"cover", backgroundPosition:"center"}} >
                    <div className='container text-center'>
                        <h1 className='display-4 text-light '>{this.state.church.name}</h1>
                        <p className='lead'>{this.state.church.tag}</p>
                        <ul className='list-inline'>
                            <li className='list-inline-item'>
                                <Link to={`mailto:${this.state.church.email}`}>{this.state.church.email}</Link>
                            </li>
                            <li className='list-inline-item'>
                                <Link to={`tel:${this.state.church.phone}`}>{this.state.church.phone}</Link>
                            </li>
                        </ul>
                        <p className='text-center text-primary'>Worship with us every Sunday</p>
                        <hr className='my-4' />
                        <p className='lead '>
                            <Link className='btn btn-warning btn-lg' to='/donations'> Donate </Link>
                            <Link className='btn btn-outline-dark btn-lg mx-1' to='/login'> Login </Link>
                            <Link className='btn btn-outline-secondary btn-lg' to='/signup'> Signup </Link>
                        </p>
                    </div>
                    
                </div>
            </section>
        );
    }
}