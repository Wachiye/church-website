import React, { Component } from "react";
import UserDataService from "../../services/user";
import * as $ from 'jquery/dist/jquery';

export default class AddUser extends Component {
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
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.checkPassword = this.checkPassword.bind(this);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            dob: new Date(),
            age: 0,
            gender: "",
            username: "",
            password: "",
            confirm_password:"",
            type: "",
            role: "",

            users : [],
            submitted: false
        };
    }

    componentDidMount() {
        this.setState({
            users: ['test -user'],
            username: 'test-user'
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

    onChangePassword(e) {
        this.setState({
            password: e.target.value
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

    saveUser(e) {
        e.preventDefault();
        let {password, confirm_password} = this.state;
        
        let passwordMatch = this.checkPassword(password, confirm_password);
        
        if(!passwordMatch){
            $('#response-text').addClass('text-danger').text("Passwords Don't Match");
            return;
        }
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            dob: this.state.dob,
            age: this.state.age,
            gender: this.state.gender,
            username: this.state.username,
            password: this.state.password,
            type: this.state.type,
            role: this.state.role,
        };

        UserDataService.create(user)
            .then(res => {
                $('#response-text').addClass('text-success').text(res.data.message);

            })
            .catch(e => {
                console.log(e.message);
                $('#response-text').addClass('text-danger').text("Unknown Server Error. Try again later...");
            });
    }

    render() {
        return(
            <section id='main'>
                <h1 className='section-title'>Signup Now</h1>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='signup-form' name='signup-form' className="signup-form" >
                                <div className='container'>    
                                    <div className="row mb-1">
                                        <div className='col-md-6'>
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" className="form-control"
                                                id="first_name" required value={this.state.first_name}
                                                    onChange={this.onChangeFirstName} name="first_name"/>
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" className="form-control"
                                                id="last_name" required value={this.state.last_name} 
                                                onChange={this.onChangeLastName} name="last_name"/>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control"
                                                id="email" value={this.state.email}
                                                onChange={this.onChangeEmail} name="email" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" className="form-control"
                                                id="phone" value={this.state.phone} onChange={this.onChangePhone}
                                                name="phone" pattern='[0-9]{3}[0-9]{1}[0-9]{8}' placeholder='2547XXXXXXXX'/>
                                            <span className='form-text text-info'>Input format: 2547XXXXXX</span>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input type="date" className="form-control"
                                                id="dob" required value={this.state.dob}
                                                onChange={this.onChangeDOB} name="dob" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="age">Age</label>
                                            <input type="number" className="form-control"
                                                id="age" required value={this.state.age}
                                                onChange={this.onChangeAge} name="age" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="gender">Gender</label>
                                            <select className="form-control" id="gender" name="gender" required value={this.state.gender} onChange={this.onChangeGender}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control"
                                                id="username" required value={this.state.username}
                                                onChange={this.onChangeUsername} name="username" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control"
                                                id="password" required value={this.state.password}
                                                onChange={this.onChangePassword} name="password" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input type="password" className="form-control"
                                                id="confirm_password" required value={this.state.confirm_password}
                                                onChange={this.onChangeConfirmPassword} name="confirm_password" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className="col-md-6">
                                            <label htmlFor="type">User Type</label>
                                            <select className="form-control" id="type" name="type" required  value={this.state.type} onChange={this.onChangeType}>
                                                <option value="visitor">Visitor</option>
                                                <option value="member">Member</option>
                                                <option value="staff">Staff</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="role">Role</label>
                                            <select className="form-control" id="role" name="role" required   value={this.state.role} onChange={this.onChangeRole}>
                                                <option value="member">Member</option>
                                                <option value="leader">Leader</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='response my-1' id='response'>
                                        <p className='lead' id='response-text'></p>
                                    </div>
                                    <div className='row'>
                                        <div className='col my-1 text-center'>
                                            <button type="submit" className="btn btn-success" onClick={this.saveUser}>Create Account</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}