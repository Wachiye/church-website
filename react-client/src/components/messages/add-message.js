import React , {Component} from 'react'

export default class AddMessage extends Component{
    render() {
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Create New Message</h1>
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