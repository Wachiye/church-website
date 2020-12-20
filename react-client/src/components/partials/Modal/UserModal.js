import React from "react";
import { Link } from "react-router-dom";

import UserDataService from "../../../services/user";

class UserModal extends React.Component{
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
    }
    deleteUser(id) {    
        UserDataService.delete(id)
          .then(res => {

          })
          .catch(e => {
            console.log(e);
          });
    }
    render(){
        let {user, id} = this.props;

        return (
            <div className="modal fade show" id={id} tabIndex="-1" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">User Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true">
                                    <i className='fa fa-close'></i>
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='top-right bg-warning'> A/C Type: {user.type} </div>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='d-flex-column' style={{border: '1px solid #ccc'}}>
                                            <img id='UserImage' src={user.image || "/favicon.ico"} alt='' className='img-fluid' width='150'></img>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <h5 className='text-primary mt-3 mb-1'>{user.first_name} {user.last_name}</h5>
                                        <span className='text-muted'>@ {user.username}</span>
                                        <ul className='list-inline'>
                                            <li className='list-inline-item'>
                                                <i className='fa fa-envelope mr-1'> </i>
                                                {user.email || 'No Email'}
                                            </li>
                                            <li className='list-inline-item'>
                                                <i className='fa fa-phone mr-1'> </i>
                                                {user.phone || 'No Phone'}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-12'>
                                        <table className='table table-sm'>
                                            <tr>
                                                <td><strong>D.O.B</strong></td>
                                                <td>{user.dob.slice(0,10)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Age</strong></td>
                                                <td>{user.age}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Gender</strong></td>
                                                <td>{user.gender}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td>{user.address}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan='2' className='text-center'>
                                                    <div className='btn-group btn-group-sm'>
                                                        <Link to={`/users/edit/${user.id}`} className='btn btn-success btn-sm'
                                                         title='Edit' >
                                                            <i className='fa fa-edit'> Edit</i>
                                                        </Link>
                                                        <button  className='btn btn-danger btn-sm' title='Edit'
                                                        onClick={() => this.deleteUser(user.id)}>
                                                            <i className='fa fa-trash'> Delete</i>
                                                        </button>
                                                        <button type="button" className="btn btn-dark btn-sm" data-dismiss="modal">
                                                            <i className='fa fa-close'> Close</i>
                                                            </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default UserModal;

            