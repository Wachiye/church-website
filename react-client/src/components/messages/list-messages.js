import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import * as $ from 'jquery/dist/jquery.slim';
import MessageDataService from '../../services/message';
import ErrorCard from '../partials/Card/ErrorCard';

export default class ListMessages extends Component{
    state = {
        messages : [],
        unread : [],
        error:{}
    }
    constructor(props){
        super(props);
        this.retrieveMessages = this.retrieveMessages.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.viewMessage = this.viewMessage.bind(this);
    }
    componentDidMount(){
        this.retrieveMessages();
    }
    retrieveMessages() {
        MessageDataService.getAll()
          .then(res => {
              this.setState({
              messages: res.data,
              error: res.error
            });
          });
      }
    
    refreshList() {
        this.retrieveMessages();
    }
    viewMessage(e){
        e.preventDefault();
        let message_id = e.target.value || e.currentTarget.value;
        let elementId = e.target.getAttribute('data-display-id') ||e.currentTarget.getAttribute('data-display-id');
        
        let message = this.state.messages.filter(msg => msg.id === message_id)[0];
        
        let message_info = `<h5>${message.reason || 'New Contact Message'}</h5>
            <h6>From: ${message.name}</h6>
            <ul class='list-inline'>
                <li class='list-inline-item'>
                    <i class='fa fa-envelope mr-1'> </i>
                    ${message.email}
                </li>
                <li class='list-inline-item'>
                    <i class='fa fa-phone mr-1'> </i>
                    ${message.phone}
                </li>
            </ul>
            <p>${message.createdAt.slice(0,10)}</p>
            <p class='lead'>${message.message}</p>
            <div class='reply my-1'>
                <form>
                    <textarea class='form-control' id='reply' name='reply' 
                    rows='5' placeholder='Enter message reply'></textarea>
                    <div class='form-row'>
                        <button type='submit' class='btn btn-outline-dark my-1'>
                            <i class='fa fa-send'> </i> Send Reply
                        </button>
                        <button type='button' class='btn btn-outline-danger my-1 mx-1'>
                            <i class='fa fa-trash'> </i> Delete Message
                        </button>
                    </div>
                    
                </form>
            </div>`
        $(`.message-sm`).removeClass('d-block').addClass('d-none');
        $(`#${elementId}`).removeClass('d-none').addClass('d-block').html(message_info);
    }
    render() {
        let { messages, error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='/messages/add' className='btn btn-primary btn-sm' title='Add Event'>
                            <i className='fa fa-plus'> Add</i>
                        </Link>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshList} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div class="card">
                                <div class="card-header">List of messages
                                    <div className='float-right'>
                                        <form className='filter-form d-inline float-left mr-2' id='filter-form' name='filter-form'>
                                            <div class="input-group input-group-sm mb-3">
                                                <div className='input-group-append'>
                                                    <i className='fa fa-filter input-group-text'> Filter </i>
                                                </div>
                                                <select className="form-control form-control-sm" id="filter" name="filter" required  >
                                                    <option value="unread">Unread</option>
                                                    <option value="today">Today</option>
                                                    <option value="week">This Week</option>
                                                    <option value="all">All Time</option>
                                                </select>
                                                <div class="input-group-prepend">
                                                    <button class="btn btn-primary btn-sm" type="button" id="button-addon">Apply</button>
                                                </div>
                                            
                                            </div>
                                        </form>
                                        <div className='btn-group btn-group-sm d-inline float-right'>
                                            <Link to='/messages/reply/auto' className='btn btn-primary btn-sm' title='Mass Reply'>
                                                <i className='fa fa-reply-all'></i>
                                            </Link>
                                            <Link to='/messages/read' className='btn btn-success btn-sm' title='Mass Reply'>
                                                <i className='fa fa-check-square-o'></i>
                                            </Link>
                                            <Link to='/messages/del' className='btn btn-danger btn-sm' title='Delete All Messages'>
                                                <i className='fa fa-trash'></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id='messages' className='card-body'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-md-4 border-right' >
                                                <ul className='list-unstyled message-list' >
                                                    {messages.map( (msg, index) => {
                                                        return(
                                                            <li className='message-item' >
                                                                <h5 className='from'>{msg.name}</h5>
                                                                <p className='body'>{msg.message.slice(0,40)}</p>
                                                                <div className='action-list'>
                                                                    <button className='action-item btn btn-sm d-md-none' type='button' title='View'
                                                                        onClick={this.viewMessage}  value={msg.id} data-display-id={`msg-${index}`}>
                                                                        <i className='fa fa-eye'></i>
                                                                    </button>
                                                                    <button className='d-none d-md-block action-item btn btn-sm' type='button' title='View'
                                                                        onClick={this.viewMessage} value={msg.id} data-display-id='message'>
                                                                        <i className='fa fa-eye'></i>
                                                                    </button>
                                                                    <a className='action-item' href='/messages/read' title='Mark as Read'>
                                                                        <i className='fa fa-check'></i>
                                                                    </a>
                                                                    <a className='action-item' href='/messages/del' title='Delete'>
                                                                        <i className='fa fa-trash'></i>
                                                                    </a>
                                                                </div>
                                                                <div id={`msg-${index}`} className='d-md-none message-sm'></div>
                                                            </li>
                                                        
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className='d-none d-md-block col-md-8'>
                                                <div className='message' id='message'>
                                                    <p className='lead text-center text-info'>Select Message To view Content</p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="card-footer">
                                    <ul className='pagination pagination-sm float-right'>
                                        <p className='page-title mr-1'>Items/Page</p>
                                        <li className='page-item'>
                                            <input className='form-control form-control-sm'
                                                id='limit' name='limit' type='number' min='5' max='100' defaultValue='20' step='5'></input>
                                        </li>
                                        <li className='page-item'>
                                            <Link to='/messages/page' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/messages/page' className='page-link'>Next</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}