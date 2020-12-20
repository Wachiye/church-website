import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import * as $ from 'jquery/dist/jquery';
import AuthDataService from '../../services/auth';

export default class Login extends Component {
        state = {
            username : '',
            password : '',
            user : {}
        }
        constructor(props){
            super(props);

            this.onChangeUsername = this.onChangeUsername.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.loginUser = this.loginUser.bind(this);
        }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        }); 
    }

    loginUser(e) {
        e.preventDefault();

        const login_data = {
            username : this.state.username,
            password : this.state.password
        }

        AuthDataService.login(login_data)
            .then( async user => {
               if(user){
                   $('#response-text').removeClass('text-danger').addClass('text-success').text('Login was Successful. Redirecting ...')
                   window.location='/admin/dashboard'
                }
                else{
                    $('#response-text').removeClass('text-success').addClass('text-danger').text('Invalid User Account');
                }
            })
            .catch( err => {
                if(err.response){
                    $('#response-text').removeClass('text-success').addClass('text-danger').text(err.response.data.message)
                }
            });
    }

    render() {
        return (
            <section id='login'>
                <h1 className ='section-tile text-center'>Member Login</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <form id='login-form' name='login-form'>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input className='form-control' id='username' name='username'
                                        type='text' required value={this.state.username} 
                                        onChange={this.onChangeUsername} placeholder='Enter your username' ></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input className='form-control' id='password' name='password'
                                        type='password' required value={this.state.password}
                                        onChange={this.onChangePassword} placeholder='Enter your Password' ></input>
                                </div>
                                {/* <div className='form-group'>
                                    <Link to='/forgot-password'
                                     component={ForgotPassword}>ForgotPassword</Link>
                                </div> */}
                                <div className='response' id='response'>
                                    <p className='lead' id='response-text'></p>
                                </div>
                                <button className='btn btn-dark  btn-block my-2' type='submit' id 
                                 ='login-btn' onClick={this.loginUser}>Login</button>
                                <div className='form-group text-center'>
                                    <p>Don't have an Account?
                                        <Link to='/signup'>Create Account</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}