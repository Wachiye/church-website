import React , {Component} from 'react'
import * as $ from 'jquery/dist/jquery.slim';
import {Link} from 'react-router-dom';

import ChurchDataService from '../../services/church';
import UserDataService from '../../services/user';

export default class Church extends Component{
    state = {
        church: {},
        users:[],
        staffs:[],
        name:"",
        tag:"",
        email:"",
        phone:"",
        address:"",
        imageFile:""
    }
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.updateChurch = this.updateChurch.bind(this);
    }
    async componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        let church = await ChurchDataService.getAll();
        let users = await UserDataService.getAll();

        this.setState({
            church: church.data[0],
            users: users.data,
            staffs: users.data.filter(user => user.type === 'staff')
        });
    }
    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeTag(e){
        this.setState({
            tag: e.target.value
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
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        })
    }
    onChangeFile(e){
        this.setState({
            imageFile: e.target.value
        })
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
    previewUser(e){
        e.preventDefault();
        let user_id = e.target.value || e.currentTarget.value;
        let elementId = e.target.getAttribute('data-display-id') ||e.currentTarget.getAttribute('data-display-id');
        
        let user = this.state.users.filter(user => user.id === user_id)[0];
        
        let user_info = `<div class='alert alert-dismissible fade show ' role='alert' id='${user.id}'>
                <button type='button' class='close'  data-dismiss='alert' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                </button>
                <div class='card bg-info rounded-top my-1 p-2 w-100'>
                    <div class='card-img-top text-center d-flex-column mx-1'>
                        <img class='rounded-circle media-object' width='64' height='64'
                        src='/favicon.ico' alt=''></img>
                    </div>
                    <div class='card-body'>
                        <h5 class='card-title'>${user.first_name + ' ' + user.last_name}</h5>
                        <h6 class='card-subtitle text-muted'>@ ${user.username}</h6>
                        <ul class='card-text list-inline'>
                            <li class='list-inline-item'>
                                <i class='fa fa-envelope mr-1'> </i>
                                ${user.email}
                            </li>
                            <li class='list-inline-item'>
                                <i class='fa fa-phone mr-1'> </i>
                                ${user.phone}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>      
        `
        $()
        $(`#${elementId} .alert`).remove();
        $(`#${elementId}`).removeClass('d-none')
        $(`#${elementId}`).append(user_info);
    }
    createStaff(e){
        e.preventDefault();
        let user_id = $('#user_id').val(),
            type = 'staff',
            role = $('#role').val()
        
        let staff = {
            type: type,
            role: role
        }
        console.log(user_id, staff)
        UserDataService.update(user_id, staff)
            .then(res => {
                if(res.status === 200){
                    window.location ='/admin/church'
                }
            })
    }
    revokeStaffPrivilege(e){
        e.preventDefault();
        let user_id = e.target.value
        UserDataService.update(user_id,{role:'member',type:'member'})
            .then(res =>{
                if(res.status === 200){
                    window.location ='/admin/church'
                }
            })
    }
    deleteUser(e){
        e.preventDefault();
        let user_id = e.target.value
        UserDataService.delete(user_id)
            .then(res =>{
                if(res.status === 200){
                    window.location ='/admin/church'
                }
            })
    }
    updateChurch(e){
        e.preventDefault();
        
    }
    render() {
        return (
            
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Church Details</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12' >
                            <div className='card bg-transparent border-info rounded text-light' style={
                            {minHeight:"200px", 
                            background:"linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)), url(/img/bg-bible.jpeg) center center no-repeat",
                            backgroundSize:"cover"
                            }}>
                                <div className='card-body'>
                                    <div className='card-text'>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-md-4 text-center '>
                                                    <div className='p-1 rounded' style={{width:"auto"}}>
                                                        <img id='previewImage' src='/favicon.ico' alt='' className='img-fluid' width='150'></img>
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
                                                </div>
                                                <div className='col-md-8'>
                                                    <h2 className='card-title'>{this.state.church.name}</h2>
                                                    <h6 className='card-subtitle text-muted'>{this.state.church.tag}</h6>
                                                    <ul className='list-inline'>
                                                        <li className='list-inline-item'>
                                                            <i className='fa fa-envelope mr-1'> </i>
                                                            {this.state.church.email || 'no email'}
                                                        </li>
                                                        <li className='list-inline-item'>
                                                            <i className='fa fa-phone mr-1'> </i>
                                                            {this.state.church.phone || 'no phone'}
                                                        </li>
                                                    </ul>
                                                    <p className='card-text lead'>{this.state.church.address}</p>
                                                    <ul className='list-inline'>
                                                        <li className='list-inline-item bg-primary rounded p-1 mb-1'>
                                                            <Link to='/users' className='text-decoration-none text-light' >
                                                                <i className='fa fa-users mr-1'> </i>
                                                                Users: {this.state.users.length}
                                                            </Link>
                                                        </li>
                                                        <li className='list-inline-item bg-secondary rounded p-1 mb-1'>
                                                            <i className='fa fa-graduation-cap mr-1'> </i>
                                                            Staff: {this.state.staffs.length}
                                                        </li>
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 my-1'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6 mb-1 border-right'>
                                        <h3>Update Church Details</h3>
                                        <hr className='mb-2'/>
                                        <form id='church-form' name='church-form'>
                                            <div className='form-group'>
                                                <label htmlFor='name'>Name</label>
                                                <input className='form-control' id='name' name='name'
                                                    placeholder='Enter church name' required
                                                    value={this.state.name || this.state.church.name} onChange={this.onChangeName}></input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='tag'>Tag Line</label>
                                                <input className='form-control' id='tag' name='tag'
                                                    placeholder='Enter church tag line' required
                                                    value={this.state.tag || this.state.church.tag} onChange={this.onChangeTag}></input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email</label>
                                                <input type='email' className='form-control' id='email' name='email' 
                                                    placeholder='Enter church email ' required
                                                    value={this.state.email || this.state.church.email} onChange={this.onChangeEmail}></input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='phone'>Phone</label>
                                                <input type='phone' className='form-control' id='phone' name='phone' 
                                                    placeholder='Enter church phone number ' required pattern='[0-9]{3}7[0-9]{8}'
                                                    value={this.state.phone || this.state.church.phone} onChange={this.onChangePhone}></input>
                                                <span className='form-text text-info'>Input Format (254)7XXXXXXXX</span>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='address'>Address</label>
                                                <textarea className='form-control' id='address' name='address'
                                                    placeholder='Enter church address' required rows='2'
                                                    value={this.state.address || this.state.church.address} onChange={this.onChangeAddress}></textarea>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='file'>Image File</label>
                                                <input type='file' className='form-control-file' id='file' name='file'
                                                    accept='image/*' required></input>
                                            </div>
                                            
                                            <button type='button' className='btn btn-lg btn-dark' onClick={this.updateChurch}>Save Now</button>
                                        </form>
                                    </div>
                                    <div className='col-md-6 mb-1'>
                                        <h3>Display Image</h3>
                                        <div className='card bg-transparent border-0'>
                                            <img className='card-img-top ' src='/favicon.ico' alt='' height='200'></img>
                                            <div className='card-body'>
                                                <div className='btn-group btn-group-sm'>
                                                    <button className='btn btn-sm btn-primary'>Select</button>
                                                    <button type='button' id='upload-btn' className='btn btn-success btn-sm disabled'>
                                                        <i className='fa fa-upload'></i>
                                                    </button>
                                                    <button type='button' className='btn btn-danger btn-sm'>
                                                        <i className='fa fa-trash'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card bg-transparent border-0'>
                                            <div className='card-header'> Staffs
                                                <div className='float-right'>
                                                    <div className='btn-group btn-group-sm'>
                                                        <a href='#add-new-staff' className='btn btn-success btn-sm'
                                                            data-toggle='modal' data-target='#add-new-staff'>
                                                            <i className='fa fa-plus'></i>
                                                        </a>
                                                        <Link to='/church/staff/del' className='btn btn-danger btn-sm'>
                                                            <i className='fa fa-trash'></i>
                                                        </Link>
                                                        <div className='modal fade show' tabIndex='-1' id='add-new-staff'>
                                                            <div className='modal-dialog' role='document'>
                                                                <div className='modal-content'>
                                                                    <div className='modal-header'>
                                                                        
                                                                        <h4 className='modal-title'>Add New Staff</h4>
                                                                        <button type="button" className="close" 
                                                                        data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">×</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className='modal-body'>
                                                                        <form className='staff-form' id='staff-form'>
                                                                            <div className='form-group' id='user_info'>
                                                                                <label htmlFor='user_id'>Select User</label>
                                                                                <select className="form-control" id="user_id" name="user_id" defaultValue='' required 
                                                                                    onChange={this.previewUser.bind(this)} data-display-id='user_info'>
                                                                                    {this.state.users ? 
                                                                                        this.state.users.filter( (user) =>user.type !== 'staff')
                                                                                        .map((user,index) => {
                                                                                            return(
                                                                                                <option value={user.id} key={index} >{user.first_name + ' ' + user.last_name}</option>
                                                                                            )
                                                                                        }):(
                                                                                            <option value='0'>NO USERS TO SELECT</option>
                                                                                        )}
                                                                                </select>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="type">User Type</label>
                                                                                <select className="form-control" id="type" name="type" defaultValue='staff' required disabled >
                                                                                    <option value="visitor">Visitor</option>
                                                                                    <option value="member">Member</option>
                                                                                    <option value="staff">Staff</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="role">Role</label>
                                                                                <select className="form-control" id="role" name="role" required  >
                                                                                    <option value="member">Member</option>
                                                                                    <option value="leader">Leader</option>
                                                                                </select>
                                                                            </div>
                                                                            <p className='card-text d-none my-1' id='card-text'></p>
                                                                            <button type="button" className="btn btn-success"
                                                                                onClick={this.createStaff.bind(this)}>Create Staff</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card-body'>
                                                <ul className='list-group list-group-flush'>
                                                    {this.state.staffs.length > 0 ? 
                                                    this.state.staffs.map( (staff, index) =>{
                                                        return(
                                                            <li className='list-group-item' key={index} >
                                                                <img src='/favicon.ico' className='rounded-circle img-fluid d-inline' alt='' width='45' height='45'></img>
                                                                <h5 className='d-inline mx-1'>{staff.first_name + ' ' + staff.last_name}</h5>
                                                                <div className='w-100 clearfix'>
                                                                    <div className='float-right'>
                                                                        <div className='btn-group btn-group-sm'>
                                                                            <button type='button' id='view-staff-btn' className='btn btn-primary btn-sm' 
                                                                            title='View' value={staff.id} data-display-id={`staff-${index}`} onClick={this.previewUser.bind(this)}>
                                                                                <i className='fa fa-eye'></i>
                                                                            </button>
                                                                            <button type='button' className='btn btn-warning btn-sm' 
                                                                            title='Revoke Privilege' id='btn-revoke' value={staff.id} onClick={this.revokeStaffPrivilege.bind(this)}>
                                                                                <i className='fa fa-remove' ></i>
                                                                            </button>
                                                                            <button type='button' className='btn btn-danger btn-sm' 
                                                                            title='Delete Permanently' value={staff.id} onClick={this.deleteUser.bind(this)}>
                                                                                <i className='fa fa-trash' ></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='d-done w-100 clearfix' id={`staff-${index}`} ></div>
                                                            </li>
                                                        )
                                                    }):(
                                                        <p>No staff added</p>
                                                        
                                                    )}
                                                    
                                                    
                                                    
                                                </ul>
                                            </div>
                                        </div>

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