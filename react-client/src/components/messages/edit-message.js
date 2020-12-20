import React , {Component} from 'react'
import MessageDataService from '../../services/message';
import ErrorCard from '../partials/Card/ErrorCard';

export default class EditMessage extends Component{
    state = {
        msg: {},
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: 'New Contact Message'
    }
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.retrieveMessage = this.retrieveMessage.bind(this);
        this.refreshMessage = this.refreshMessage.bind(this);
    }
    componentDidMount(){
        return this.retrieveMessage()
    }
    async retrieveMessage(){
        MessageDataService.get(this.props.match.params.id)
            .then(res => {
                this.setState({
                    msg: res.data,
                    error: res.error
                });
            });

        
    }
    refreshMessage() {
        return this.retrieveMessage();
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
    render() {
        let {msg, error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshMinistry} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Edit Message</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='message-form' name='message-form'>
                                <div className='form-group'>
                                    <label htmlFor='subject'>Subject</label>
                                    <input className='form-control' id='subject' name='subject'
                                        placeholder='Enter message subject' required></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='message'>Message</label>
                                    <textarea className='form-control' id='message' name='message'
                                        placeholder='Enter message message' required rows='5'></textarea>
                    
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Use this Email</label>
                                    <input type='email' className='form-control' id='email' name='email' 
                                        placeholder='Enter message email' required></input>
                                    
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='phone'>Phone</label>
                                    <input className='form-control' id='phone' name='phone'
                                        placeholder='Enter message phone here' required></input>
                                </div>
                                <button type='submit' className='btn btn-lg btn-dark'>Sent Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}