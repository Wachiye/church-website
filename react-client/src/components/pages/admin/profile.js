import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../../services/auth';
import UserDataService from  '../../../services/user';
import * as $ from 'jquery/dist/jquery.slim';
const date = new Date();

export default class Profile extends Component{
    state = {
        user : {},
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: new Date(),
        age: 0,
        gender: "",
        address: "",
        current_password: "",
        new_password: "",
        confirm_password: "",
        type: "",
        role: "",
        imageFile:{}
    }
    
    constructor(props){
        super(props);
        
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.changeUserPassword = this.changeUserPassword.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    async componentDidMount() {
        let user = await UserDataService.get(this.getUserId());
        user.data.dob = (new Date(user.data.dob));
        this.setState({
            user: user.data
        });
    }
    getUserId(){
        let access_id = localStorage.getItem('access_id');
        return access_id;
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

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
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

    onChangeFile(e) {
        this.setState({
            imageFile: e.target.files[0]
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
    selectFile(e){
        e.preventDefault();
        $("#file").click();
    }
    previewImage(){
        const file = $('#file').get(0).files[0];
        console.log(file)
        if(file){
            const reader = new FileReader();
            reader.onload = ()=>{
                const result = reader.result;
                $('#previewImage').attr('src', result);
                $('#upload-btn').toggleClass('disabled');
            }
            reader.readAsDataURL(file)
        }
    }
    updateUser(e) {
        e.preventDefault();
        const user = {
            first_name: this.state.first_name || this.state.user.first_name,
            last_name: this.state.last_name || this.state.user.last_name,
            email: this.state.email || this.state.user.email,
            phone: this.state.phone || this.state.user.phone,
            dob: this.state.dob || this.state.user.dob,
            age: this.state.age || this.state.user.age,
            gender: this.state.gender || this.state.user.gender,
            file: this.state.file || null,
            address: this.state.address || this.state.user.address
        };
        let user_id = this.getUserId();
        UserDataService.update(user_id, user)
            .then(res=> {
                $('#response-text').addClass('text-success').text(res.data.message);

            })
            .catch(err => {
                $('#response-text').addClass('text-danger')
                .text( err.response.data.message || "Unknown Server Error. Try again later...");
            });
    }

    changeUserPassword(e){
        e.preventDefault();
        let new_pass = this.state.new_password,
            con_pass = this.state.confirm_password,
            cur_pass = this.state.current_password
            
        if(this.checkPassword(new_pass, con_pass)){
            let data ={
                user_id : this.getUserId(),
                current_password: cur_pass,
                new_password: new_pass
            }
            auth.changePassword(data)
                .then(res => {
                    if(res.status === 200){
                        $('#response-text-pass').addClass('text-success').text(res.data.message);
                    }
                    else{
                        $('#response-text-pass').addClass('text-danger').text(res.data.message);
                    }
                })
                .catch( err =>{
                    $('#response-text-pass').addClass('text-danger')
                        .text( err.response.data.message || "Unknown Server Error. Try again later...");
                    
                });
        }
    }

    removeImage(e){
        e.preventDefault();
        let Address = this.state.user.Address;
        let file = this.state.imageFile;
        let data = {
            Address: Address,
            file: file
        }
        let user_id = this.getUserId();

        UserDataService.removeImage(user_id, data)
            .then(res => {
                // if(res.status === 200){
                //     this.setState({
                //         user.image:null}
                //     })
                // }
            })
            .catch( err => {
                console.error(err)
            })
    }
    logout(){
        auth.logout();
    }
    
    render(){
        return(
            <div id='main'>
                <div id='profile'>
                    <div className='container-fluid'>
                       <div className='row mb-2'>
                           <div className='col-md-4 col-lg-3 border-right flex'>
                                <div className='card bg-transparent border-0'>
                                    <div className='card-body pt-4 d-flex-column'>
                                        <div className='top-right bg-warning'> A/C Type: {this.state.user.role} </div>
                                        <div className='card-text my-1 p-2' style={{border: '1px solid #ccc'}}>
                                            <img id='previewImage' src={`${this.state.user.image || '/favicon.ico'}`} alt='' className='img-fluid' width='150'></img>
                                            <div className='mx-auto my-1'>
                                                <input type='file' id='file' name='file' accept='image/*' 
                                                className='d-none' onChange={this.previewImage.bind(this)} ></input>
                                                <div className='btn-group btn-group-sm'>
                                                    <button type='button' className='btn btn-outline-primary btn-sm' onClick={this.selectFile.bind(this)}>
                                                        <i className='fa fa-edit'></i>
                                                    </button>
                                                    <button type='button' id='upload-btn' className='btn btn-outline-success btn-sm disabled'>
                                                        <i className='fa fa-upload'></i>
                                                    </button>
                                                    <button type='button' className='btn btn-outline-danger btn-sm'>
                                                        <i className='fa fa-trash'></i>
                                                    </button>   
                                                </div>

                                            </div>
                                        </div>
                                        <h4 className='card-title text-primary mt-3 mb-1'>{`${this.state.user.first_name} ${this.state.user.last_name}`}</h4>
                                        <span className='text-muted'>{`@${this.state.user.username}`}</span>
                                        
                                        <div className='card-text'>
                                            <div className='btn-group btn-group-sm d-flex'>
                                                <button type='button' className='btn btn-outline-primary btn-sm' title='My Donations'>
                                                    <i className='fa fa-money'></i>
                                                </button>
                                                <button type='button' className='btn btn-outline-success btn-sm' title='Resources'>
                                                <i className='fa fa-file'></i>
                                                </button>
                                                <Link to='/logout' title='Logout' className='btn btn-outline-warning btn-sm fa fa-sign-out' onClick={this.logout.bind('this')}></Link>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                           </div>
                            <div className='col-md-8 col-lg-6 border-right'>
                                <div className='card bg-transparent border-0 mb-2' id='info'>
                                    <div className='container card-body'> 
                                        <h5 className='card-title text-uppercase'>Update Personal Details</h5>   
                                        <div className="card-text row mb-1">
                                            <div className='col-md-12'>
                                                <label htmlFor="first_name">First Name</label>
                                                <input type="text" className="form-control"
                                                    id="first_name" required  name="first_name" 
                                                    defaultValue={this.state.user.first_name} onChange={this.onChangeFirstName}/>
                                            </div>
                                            <div className='col-md-12'>
                                                <label htmlFor="last_name">Last Name</label>
                                                <input type="text" className="form-control"
                                                    id="last_name" required name="last_name" 
                                                    defaultValue={this.state.user.last_name} onChange={this.onChangeLastName}/>
                                            </div>
                                        </div>
                                        <div className='card-text row mb-1'>
                                            <div className="col-md-12">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control"
                                                    id="email" name="email" 
                                                    defaultValue={this.state.user.email} onChange={this.onChangeEmail}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" className="form-control"
                                                    id="phone" name="phone" pattern='[0-9]{3}[0-9]{1}[0-9]{8}' placeholder='2547XXXXXXXX'
                                                    defaultValue={this.state.user.phone} onChange={this.onChangePhone}/>
                                                <span className='form-text text-info'>Input format: 2547XXXXXX</span>
                                            </div>
                                        </div>
                                        <div className='card-text row mb-1'>
                                            <div className="col-md-12">
                                                <label htmlFor="dob">Date of Birth</label>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <input type='date' className='form-control'  
                                                        placeholder='Date of birth' ></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="age">Age</label>
                                                <input type="number" className="form-control"
                                                    id="age" required name="age" 
                                                    defaultValue={this.state.user.age}  onChange={this.onChangeAge}/>
                                            </div>
                                        </div>
                                        <div className=' card-text row mb-1'>
                                            <div className="col-md-6">
                                                <label htmlFor="gender">Gender</label>
                                                <select className="form-control" id="gender" name="gender" required 
                                                defaultValue={this.state.user.gender}  onChange={this.onChangeGender}>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='card-text row'>
                                            <div className='col-md-12'>
                                                <label htmlFor='address'>Address</label>
                                                <textarea className='form-control' id='address' name='address' rows='2'
                                                 defaultValue={this.state.user.address} onChange={this.onChangeAddress}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='response my-1' id='response'>
                                        <p className='lead' id='response-text'></p>
                                    </div>
                                    <div className='card-footer bg-transparent'>
                                        <button type='button' className='btn btn-dark' onClick={this.updateUser}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 col-lg-3'>
                                <div className='card bg-transparent mb-2 border-0' id='security'>
                                    <div className='container card-body'>
                                        <h5 className='card-title text-uppercase'>Update Security Details</h5>
                                        <div className='card-text row mb-1'>
                                            <div className="col-md-12">
                                                <label htmlFor="current_password">Current Password</label>
                                                <input type="password" className="form-control"
                                                    id="current_password" required name="current_password"
                                                     defaultValue={this.state.current_password}  onChange={this.onChangeCurrentPassword}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="password">Enter Password</label>
                                                <input type="password" className="form-control"
                                                    id="password" required name="password" 
                                                    defaultValue={this.state.new_password}  onChange={this.onChangeNewPassword}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="confirm_password">Confirm Password</label>
                                                <input type="password" className="form-control"
                                                    id="confirm_password" required name="confirm_password"
                                                    defaultValue={this.state.confirm_password}  onChange={this.onChangeConfirmPassword} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='response' id='response-pass'>
                                        <p className='lead' id='response-text-pass'></p>
                                    </div>
                                    <div className='card-footer bg-transparent'>
                                        <button type='button' className='btn btn-dark' onClick={this.changeUserPassword}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}