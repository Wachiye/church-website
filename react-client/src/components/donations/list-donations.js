import React , {Component} from 'react'
import { Link } from 'react-router-dom'
import DonationDataService from '../../services/donation';
import ErrorCard from '../partials/Card/ErrorCard';
import Modal from '../partials/Modal/Modal';

export default class ListDonations extends Component{
    state = {
        donations: [],
        error: {}
    }

    constructor(props){
        super(props);

        this.retrieveDonations = this.retrieveDonations.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteDonation = this.deleteDonation.bind(this);
        this.convertDonationToHTML = this.convertDonationToHTML.bind(this)
    }

    componentDidMount(){
        this.retrieveDonations();
    }
    retrieveDonations() {
        DonationDataService.getAll()
            .then(res => {
                this.setState({
                    donations: res.data,
                    error: res.error
                });
            });
    }
    
    refreshList() {
        this.retrieveDonations();
    }


    deleteDonation(id) {    
        DonationDataService.delete(id)
          .then(res => {

            this.setState({
                donations : this.state.donations.filter(e=> e.id !== id)
            })
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteAllDonations() {
        DonationDataService.deleteAll()
          .then(res => {
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    }
    convertDonationToHTML(donation) {
        return(
            `<div id='donation'>
                <p>
                    <strong>From:</strong> ${donation.User.first_name} ${donation.User.last_name} 
                </p>
                <p>
                    <strong>Phone:</strong> ${donation.User.phone}
                </p>
                <p>
                    <strong>Purpose:</strong> ${donation.purpose}
                </p>
                <p>
                    <strong>Donation Type:</strong> ${donation.type}
                </p>
                <p>
                    <strong>Amount:</strong> ${donation.amount}
                </p>
                <p>
                    <strong>Transaction ID:</strong> ${donation.transaction_id}
                </p>
            </div>`
        )
    }
    render() {
        let { donations , error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                </div>
            )
        }
        return (
            <div id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">List of Donations
                                    <div className='float-right'>
                                        <div className='btn-group btn-group-sm'>
                                            <Link to='/donations/add' className='btn btn-success btn-sm'>Add</Link>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={this.deleteAllDonations}>Delete All</button>
                                        </div>
                                    </div>
                                </div>

                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                           <th>Name</th>
                                            <th>Phone</th>
                                            <th>Amount</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {donations.length >0 ? (donations.map( (donation, index) => {
                                        return(
                                            <tr key={donation.id}>
                                                <td>{`${donation.User.first_name} ${donation.User.last_name}`}</td>
                                                <td>{donation.User.phone}</td>
                                                <td>{donation.amount}</td>
                                                <td>{donation.transaction_id}</td>
                                                <td>{donation.createdAt.slice(0,10)}</td>
                                                <td className='text-center'>
                                                    <div className='btn-group btn-group-sm'>
                                                        <a href={`#donation-${index}`} className='btn btn-primary btn-sm'
                                                            data-toggle='modal' data-target={`#donation-${index}`}>
                                                            <i className='fa fa-eye'></i>
                                                        </a>
                                                        <button className='btn btn-danger btn-sm' 
                                                        onClick={() => this.deleteDonation(donation.id)} key={donation.id} title='Delete'>
                                                            <i className='fa fa-trash'></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })):(
                                        <tr>
                                            <td colSpan='7'>
                                                <p>There are no donations to display. Click 
                                                    <Link to='/donations/add' className='btn btn-success btn-sm mx-1'> Here </Link> 
                                                    to Donate.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                <div id='donations-modal'>
                                {donations.length >0 ? ( donations.map( (donation, index) => {
                                    let donationHTML = this.convertDonationToHTML(donation);
                                    return(
                                        <Modal key={donation.id} id={`donation-${index}`} 
                                        output={donationHTML} title={`Donation For: ${donation.purpose}`} index={index} />
                                    )
                                })) :(
                                    null
                                )}
                                </div>
                                <div className="card-footer">
                                    <ul className='pagination pagination-sm float-right'>
                                        <p className='page-title mr-1'>Items/Page</p>
                                        <li className='page-item'>
                                            <input className='form-control form-control-sm'
                                                id='limit' name='limit' type='number' min='5' max='100' defaultValue='20' step='5'></input>
                                        </li>
                                        <li className='page-item'>
                                            <Link to='/donations?page=p' className='page-link'>Previous</Link>
                                        </li>
                                        <li className='page-item'>
                                        <Link to='/donations?page=n' className='page-link'>Next</Link>
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