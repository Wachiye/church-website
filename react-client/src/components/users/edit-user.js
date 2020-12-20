import React, { Component } from "react";
import UserDataService from "../../services/user";
import * as $ from 'jquery/dist/jquery';
import auth from "../../services/auth";
import ErrorCard from '../partials/Card/ErrorCard';

export default class EditUser extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: new Date(),
        age: 0,
        gender: "",
        username: "",
        current_password: "",
        new_password:"",
        confirm_password: "",
        type: "",
        role: "",

        user:{},
        error:{}
    };

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.changeUserPassword = this.changeUserPassword.bind(this);
        this.retrieveUser = this.retrieveUser.bind(this);
        this.refreshUser = this.refreshUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        this.retrieveUser();
    }
    retrieveUser() {
        let id = this.props.match.params.id;

        UserDataService.get(id)
          .then(res => {
            this.setState({
              user: res.data,
              error: res.error
            });
          })
          .catch(e => {
            if(e.response){
                console.log("e res data"+e.response.data);
            }
            console.log(e);
          });
      }
    
    refreshUser() {
        this.retrieveUser();
    }


    deleteUser(id) {    
        UserDataService.delete(id)
          .then(res => {

            this.setState({
                users : this.state.users.filter(e=> e.id !== id)
            })
          })
          .catch(e => {
            console.log(e);
          });
    }
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeDOB(e) {
        this.setState({
            dob: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeCurrentPassword(e) {
        this.setState({
            current_password: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            new_password: e.target.value
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirm_password: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    checkPassword( pass1, pass2){
        if(pass2 === pass1){
            return true;
        }
        else{
            return false;
        }
    }

    updateUser(e) {
        e.preventDefault();

        let user_id = this.state.user.id;

        const user = {
            first_name: this.state.first_name || this.state.user.first_name,
            last_name: this.state.last_name || this.state.user.last_name,
            email: this.state.email || this.state.user.email,
            phone: this.state.phone || this.state.user.phone,
            dob: this.state.dob || this.state.user.dob,
            age: this.state.age || this.state.user.age,
            gender: this.state.gender || this.state.user.gender,
            file: this.state.file || null,
            type: this.state.type || this.state.user.type,
            role: this.state.role || this.state.user.role
        };

        UserDataService.update(user_id,user)
            .then(res => {
                $('#response-text').addClass('text-success').text(res.data.message);

            })
            .catch(e => {
                $('#response-text').addClass('text-danger').text("Unknown Server Error. Try again later...");
                console.log(e.message);
            });
    }
    changeUserPassword(e){
        e.preventDefault();
        let new_pass = this.state.new_password,
            con_pass = this.state.confirm_password,
            cur_pass = this.state.current_password;

        let user_id = this.state.user.id;

        if(this.checkPassword(new_pass, con_pass)){
            let data = {
                user_id: user_id,
                current_password: cur_pass,
                new_password: new_pass
            }
            auth.changePassword(data)
                .then(res => {
                    if(res.status === 200){
                        $('#response-text-pass').addClass('text-success').text(res.data.message);;
                    }
                    else{
                        $('#response-text-pass').addClass('text-danger').text(res.data.message);
                    }
                })
                .catch( err =>{
                    $('#response-text-pass').addClass('text-danger').text("Unknown Server Error. Try again later...");
                })
        }
    }
    render() {
        let {user,error} = this.state;
        if(error){  
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshUser} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return(
            <section id='main'>
                <h1 className='section-title'>Edit User Details</h1>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-12 col-lg-8'>
                            <form id='signup-form' name='signup-form' className="signup-form" onSubmit={this.updateUser.bind(this)}>
                                <div className='container'>    
                                    <div className="row mb-1">
                                        <div className='col-md-6'>
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" className="form-control"
                                                id="first_name" required defaultValue={user.first_name}
                                                    onChange={this.onChangeFirstName} name="first_name"/>
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" className="form-control"
                                                id="last_name" required defaultValue={user.last_name} 
                                                onChange={this.onChangeLastName} name="last_name"/>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control"
                                                id="email" defaultValue={user.email}
                                                onChange={this.onChangeEmail} name="email" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" className="form-control"
                                                id="phone" defaultValue={user.phone} onChange={this.onChangePhone}
                                                name="phone" pattern='[0-9]{3}[0-9]{1}[0-9]{8}' placeholder='2547XXXXXXXX'/>
                                            <span className='form-text text-info'>Input format: 2547XXXXXX</span>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input type="date" className="form-control"
                                                id="dob" required defaultValue={user.dob}
                                                onChange={this.onChangeDOB} name="dob" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="age">Age</label>
                                            <input type="number" className="form-control"
                                                id="age" required defaultValue={user.age}
                                                onChange={this.onChangeAge} name="age" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="gender">Gender</label>
                                            <select className="form-control" id="gender" name="gender" required defaultValue={user.gender} onChange={this.onChangeGender}>
                                                <option defaultValue="male">Male</option>
                                                <option defaultValue="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="type">User Type</label>
                                            <select className="form-control" id="type" name="type" required  defaultValue={user.type} onChange={this.onChangeType}>
                                                <option defaultValue="visitor">Visitor</option>
                                                <option defaultValue="member">Member</option>
                                                <option defaultValue="staff">Staff</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="role">Role</label>
                                            <select className="form-control" id="role" name="role" required   defaultValue={user.role} onChange={this.onChangeRole}>
                                                <option defaultValue="member">Member</option>
                                                <option defaultValue="leader">Leader</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='response my-1' id='response'>
                                        <p className='lead' id='response-text'></p>
                                    </div>
                                    <div className='row'>
                                        <div className='col my-1 text-center'>
                                            <button type="submit" className="btn btn-success" onClick={this.updateUser}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-12 col-lg-4'>
                            <div className='card bg-transparent mb-2 border-0' id='security'>
                                <div className='container card-body'>
                                    <h5 className='card-title text-uppercase'>Update Security Details</h5>
                                    <div className='card-text row mb-1'>
                                        <div className="col-md-12">
                                            <label htmlFor="current_password">Current Password</label>
                                            <input type="password" className="form-control"
                                                id="current_password" required name="current_password"
                                                defaultValue={this.state.current_password} onChange={this.onChangeCurrentPassword} />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="password">Enter Password</label>
                                            <input type="password" className="form-control"
                                                id="password" required name="password"
                                                defaultValue={this.state.new_password} onChange={this.onChangeNewPassword} />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input type="password" className="form-control"
                                                id="confirm_password" required name="confirm_password"
                                                defaultValue={this.state.confirm_password} onChange={this.onChangeConfirmPassword} />
                                        </div>
                                    </div>
                                </div>
                                <div className='response my-1' id='response'>
                                        <p className='lead' id='response-text-pass'></p>
                                    </div>
                                <div className='card-footer'>
                                    <button type='button' className='btn btn-dark' onClick={this.changeUserPassword}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}