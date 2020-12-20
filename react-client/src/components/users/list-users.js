import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../../services/user";

import * as $ from 'jquery/dist/jquery';

import UserModal from '../partials/Modal/UserModal';
import ErrorCard from '../partials/Card/ErrorCard';

class UserRow  extends React.Component{
    render() {
        return (
            this.props.users.map( (user,index) =>{
                return (
                    <tr id={`${user.id}`} key={user.id}>
                        <td>
                            <input name='users' value={user.id}  type='checkbox'/>
                        </td>
                        <td>
                            <img src={user.image} width='45' height='45' alt={user.username} />
                            <strong>{user.first_name + ' ' + user.last_name}</strong>
                        </td>
                        <td>{user.email || ''}</td>
                        <td>{user.phone || ''}</td>
                        <td>{user.type}</td>
                        <td className='text-center'>
                            <div className='btn-group btn-group-sm'>
                                <a href={`#user-${index}`} className='btn btn-primary btn-sm'
                                    data-toggle='modal' data-target={`#user-${index}`}>
                                    <i className='fa fa-eye'></i>
                                </a>
                                <Link to={`/users/edit/${user.id}`} className='btn btn-success btn-sm' title='Edit'>
                                    <i className='fa fa-edit'></i>
                                </Link>
                                <button className='btn btn-danger btn-sm' id={`del-user-${user.id}`}
                                onClick={() => this.deleteUser(user.id)} key={user.id} title='Delete'>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                );    
            })
        )
    }
}
export default class ListUsers extends Component{
    state = {
        users: [],
        error:{},
        staff:0,
        members:0,
        visitors:0,
        subscribers:0
    }

    constructor(props){
        super(props);

        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        this.retrieveUsers();
    }
    retrieveUsers() {
        UserDataService.getAll()
          .then(res => {
            this.setState({
              users: res.data,
              error: res.error,
              staff: (res.data.filter(user=> user.type === 'staff')).length,
              members: (res.data.filter(user=> user.type === 'member')).length,
              visitors: (res.data.filter(user=> user.type === 'visitor')).length,
            });
          })
          .catch(e => {
            if(e.response){
                console.log("e res data"+e.response.data);
            }
            console.log(e);
          });
      }
    
    refreshList() {
        this.retrieveUsers();
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
    deleteAllUsers() {
        UserDataService.deleteAll()
          .then(res => {
            
          })
          .then(
              this.refreshList()
          )
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        let {users, members, staff, visitors, error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <Link to='users/add' className='btn btn-primary btn-sm' title='Add Event'>
                            <i className='fa fa-plus'> Add</i>
                        </Link>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshList} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return(
            <section id='main'>
                <div className='container-fluid'>
                    <div className='row flex-row-reverse'>
                        <div className='col-md-4'>
                            <div className='well'>
                                <h5>Quick Summary</h5>
                                <ul className='list-group list-group-flush'>
                                <li className="list-group-item">
                                        All Users: 
                                        <span className="pull-right">{users.length}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Staff: 
                                        <span className="pull-right">{staff}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Members:
                                        <span className="pull-right">{members}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Subscribers:
                                        <span className="pull-right">{visitors}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div class="card">
                                <div class="card-header">List of Users
                                    <div className='float-right'>
                                        <div className='btn-group btn-group-sm'>
                                            <Link to='/users/add' className='btn btn-success btn-sm'>
                                                <i className='fa fa-plus'></i>
                                            </Link>
                                            <button  className='btn btn-danger btn-sm' onClick={this.deleteAllUsers}>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <table className='table-responsive table table-bordered table-striped w-100'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type='checkbox' id='user-list' name='user-list'></input>
                                                </th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <UserRow users={this.state.users} />
                                        </tbody>
                                    </table>
                                <div id='users-modal'>
                                {users.length >0 ? (
                                    users.map( (user, index) => {
                                        return(
                                            <UserModal key={user.id} id={`user-${index}`}  user={user} index={index} />
                                        )
                                    })
                                ):(
                                    null
                                )}
                                </div>
                                <div class="card-footer">
                                    <ul className='pagination pagination-sm float-right'>
                                        <p className='page-title mr-1'>Items/Page</p>
                                        <li className='page-item'>
                                            <input className='form-control form-control-sm'
                                                id='limit' name='limit' type='number' min='5' max='100' defaultValue='20' step='5'></input>
                                        </li>
                                        <li className='page-item'>
                                            <Link to='/users/page' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/users/page' className='page-link'>Next</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
