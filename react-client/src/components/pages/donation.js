import React , {Component} from 'react';

import DonationDataService from '../../services/donation';

export default class Donations extends Component{
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

    async pay(e){
        
        let donation = {
            type: this.state.type,
            purpose: this.state.purpose,
            amount: this.state.amount,
            phone: this.state.phone,
            description: this.state.description
        }

        DonationDataService.pay(donation)
            .then(res => {
                console.log(res)
                this.saveDonation(res.data);
            })
            .catch(err => {
                console.log(err.response)
            });
   }

   async saveDonation(data) {
       DonationDataService.create(data)
       .then( res => {
           console.log(res)
       })
       .catch(err => {
           console.log(err.response)
       });
   }

   render() {
       return(
           <section id='donation'>
               <h1 className='section-title'>Donations</h1>
                    
               <p className='text-center'>
                   <span className='text-success'> Offering </span>
                   <span className='text-primary'> Tithing </span>
                   <span className='text-success'> Gifting </span>
                   <span className='text-primary'> Donating </span>
                </p>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <p>Charity never humiliated him  who profited from it, nor ever bound him by the chains of gratitude, since it was not to him but to God that the gift was made.</p>
                                <p>Thanks for vising us today. Without Givers like you, our church can't have an impact or influence in our community.
                                </p>
                                <p>With your small donation of (Ksh 50) or <strong>more</strong>, we're partnering with local nonprofits, sending out global mission trips, and hosting small groups on topics that help real people like you . </p>
                                <p>We are honored you will bless us with your generosity.</p>
                        </div>
                        <div className='col-md-10 offset-md-1'>
                            <hr className='my-3' />
                            <h2 className='display-4 text-center'>Together, we can make a difference.</h2>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <form id='donation-form' name='donation-form'>
                                        <p className='form-text'>Upon hitting the <strong>[pay Now] </strong>button,
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
                                                placeholder='Amount to pay' defaultValue={this.state.amount} ></input>
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
                                            onClick={this.pay.bind(this)}>pay Now</button>
                                        </div>
                                    </form>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
       )
   }


}