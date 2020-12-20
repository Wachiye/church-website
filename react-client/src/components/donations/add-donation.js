import React , {Component} from 'react';

import DonationDataService from '../../services/donation';

export default class AddDonation extends Component{
    state = {
        type: '',
        purpose: '',
        amount: 50,
        name: '',
        phone: '',
        recurrent: false
    };

    constructor(props){
        super(props);

        this.onChangeType = this.onChangeType.bind(this);
        this.onChangePurpose = this.onChangePurpose.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRecurrent = this.onChangeRecurrent.bind(this);
    }

    onChangeType(e){
        this.setState({
            type: e.target.value
        });
    }

    onChangePurpose(e){
        this.setState({
            purpose: e.target.value
        });
    }

    onChangeAmount(e){
        this.setState({
            amount: e.target.value
        });
    }

    onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeRecurrent(e){
        this.setState({
            recurrent: e.target.value
        });
    }

    async donate(e){
        
        let donation = {
            type: this.state.type,
            purpose: this.state.purpose,
            amount: this.state.amount,
            phone: this.state.phone,
            description: this.state.description
        }

        DonationDataService.create(donation)
            .then(res => {

            })
   }
    render() {
        return (
        <div className='container' id='main'>
            <h1 className='text-center'>Make Donation</h1>
            <div className='row flex-row-reverse'>
                <div className='col-md-4'>
                    <div className='card shadow bg-light border-black'>
                        <h4 className='card-header'>Lipa Na Mpesa Details</h4>
                        <img className='card-img-top' src='/img/mpesa.jpg' alt='' height='100px'></img>
                        <div className='card-body'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    Paybill No: XXXXXX
                                </li>
                                <li className='list-group-item'>
                                    A/C No: Donation/Gifting/Offering/Tithing
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <form id='donation-form' name='donation-form'>
                        <p className='form-text'>Upon hitting the <strong>[Donate Now] </strong>button,
                            You will be prompted on the phone number for your MPESA PIN to confirm transaction.
                            </p>
                        <div className='form-group'>
                            <label htmlFor='type'>Donation Type</label>
                            <select name='type' id ='type'
                                className='form-control' value={this.state.type}
                                defaultValue='donation' onChange={this.onChangeType}>
                                <option value='donation'>Donation</option>
                                <option value='gifting'>Gifting</option>
                                <option value='offering'>Offering</option>
                                <option value='tithing'>Tithing</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='purpose'>Purpose</label>
                            <input type='text' className='form-control' id='purpose' name='purpose'
                                value={this.state.purpose} maxLength='13' onChange={this.onChangePurpose}
                                placeholder='Purpose for donation' defaultValue={this.state.type} ></input>
                            <span className='form-text text-info'>Max 13 Characters</span>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='amount'>Donation Amount</label>
                            <input type='number' className='form-control' id='amount' name='amount'
                                value={this.state.amount} min='50' onChange={this.onChangeAmount}
                                placeholder='Amount to Donate' defaultValue={this.state.amount} ></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input type='tel' className='form-control' id='phone' name='phone'
                                value={this.state.phone} onChange={this.onChangePhone}
                                placeholder='Phone Number' 
                                pattern='[0-9]{3}7[0-9]{8}' ></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Your Name</label>
                            <input type='text' className='form-control' id='name' name='name'
                                value={this.state.name} onChange={this.onChangeName}
                                placeholder='Your Full name'></input>
                        </div>
                        <div className='form-check-inline'>
                            <input type='checkbox' className='form-check-input' defaultValue='false' 
                            onChange={this.onChangeRecurrent} value={this.state.recurrent} ></input>
                            <label className='form-check-label' htmlFor='recurrent'>Make this a recurrent Monthly Donation</label>
                        </div>
                        <div className='form-group my-1'>
                            <button type='button' className='btn btn-dark btn-lg' 
                            onClick={this.donate.bind(this)}>Donate Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}