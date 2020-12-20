import React, { Component} from 'react';
// import { Link } from  'react-router-dom';

import ChurchDataService from '../../services/church';
import MessageDataService from '../../services/message';

export default class ContactUs extends Component{
    state ={
        church: [],
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: 'New Contact Message',

        responseMessage :'',
        submitted: false
    }

    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangePhone(e){
        this.setState({
            phone: e.target.value
        })
    }
    onChangeMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    onChangeSubject(e){
        this.setState({
            subject: e.target.value
        })
    }

    async componentDidMount(){
        let church = await ChurchDataService.getAll();
        
        this.setState({
            church: church.data[0]
        });
    }
    async sendMessage(e){
        e.preventDefault();

        const message = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
            subject: this.state.subject
        };

        MessageDataService.create(message)
            .then(response => {
                console.log(response)
                this.setState({
                    submitted: true
                });

            })
            .catch(e => {
                console.log(e.message);
            });
    }

    render(){
        return(
            <section id="contact">
			    <h1 className="section-title">Contact Us</h1>
                <p className="lead text-center">Fill in the form to contact us and we will reach you as soon as possible.</p>          
                <div className="container">
                    {this.state.submitted ? (
                            <div className='text-center text-success'>
                                {this.state.responseMessage}
                            </div>
                        ) : (
                        <div className="row">
                            <div className="col-md-6">
                                <form id="contact-form" name='contact-form'>
                                    <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input type="text" id="name" className="form-control" name="name" 
                                            placeholder="Enter your Full Name"  
                                            value={this.state.name} required onChange={this.onChangeName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Email</label>
                                            <input type="email" id="email" className="form-control" name="email" 
                                            placeholder="Enter Your Email"  
                                            value={this.state.email} required onChange={this.onChangeEmail}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input type="tel" id="phone" className="form-control" name="phone" 
                                            placeholder="Enter your Phone Number"
                                            value={this.state.phone} required onChange={this.onChangePhone}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" id="subject" className="form-control" name="subject" 
                                            placeholder="Enter Subject of Contact"  
                                            value={this.state.subject} required onChange={this.onChangeSubject}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Your Message</label>
                                            <textarea id="message" className="form-control" name="message" rows="7" 
                                            placeholder="Write Your Message Here..." 
                                            value={this.state.message} required onChange={this.onChangeMessage}
                                            ></textarea>
                                        </div>
                                        <button type="submit" id="contact-btn" 
                                        className="btn btn-sm btn-dark" onClick={this.sendMessage.bind(this)}>Send Message</button>
                                </form>
                            </div>
                            <div className="col-md-6" id="contact-list">
                            <div className="card bg-transparent h-100">
                                <div className="card-body" >
                                    <ul className="list-group list-group-flush">
                                        <p>Contact Hours 8am-6pm</p>
                                        <li className="list-group-item">
                                            Email: <span>{this.state.church.email}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Phone: <span>{this.state.church.phone}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Address: <span>{this.state.church.address}</span>
                                        </li>
                                        <li className="list-group-item fa fa-map-marker">
                                            <canvas id="map"> </canvas>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    )}
                    <section id="prayer-request">
                        <div class="container text-center">
                            <h1>Prayer Requests</h1>
                            <p class="lead">Looking for a prayer partner or seeking help for prayers? Call/SMS or send us an email via:</p>
                            <ul class="list-unstyled">
                                <li>Phone: +(123) 123 4567 891/92 </li>
                                <li>Email:prayers@church.com</li>
                            </ul>
                            <em>We Love You</em>
                        </div>
                    </section>
                </div>
		    </section>
        )
    }
}