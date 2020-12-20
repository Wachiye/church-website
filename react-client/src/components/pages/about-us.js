import React, { Component} from 'react';
import UserDataService from '../../services/user';
import ChurchDataService from '../../services/church';

class Members extends React.Component {
    render(){
        return (
            this.props.staff.map( member => {
                return(
                    <div className='col-md-3 member'>
                        <img src={member.image} className='img-responsive' alt={member.type}></img>
                        <h5 className='text-center'>{member.first_name + ' ' + member.last_name}</h5>
                    </div>
                )
            })
        )
    }
}
export default class AboutUs  extends Component {
    state = {
        staff : [],
        church : {},

    }

    async componentDidMount() {
        let staff = await UserDataService.getByType('staff');

        let church = await ChurchDataService.getAll();

        await this.setState({
            staff: staff.data,
            church: church.data[0]
        })
    }
    render() {
        return(
            <section id='about-us'>
                <h1 className='section-title text-center'>About Us</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <h3 className='text-primary'>Who We are</h3>
                            <p className='lead'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloremque in velit molestiae totam nam delectus repellendus assumenda, ad saepe quidem quo molestias voluptatibus. Quasi quaerat harum quidem accusantium repudiandae nulla fugiat? Quia amet nobis itaque asperiores ullam dolore similique?
                            </p>
                            <p className='lead'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloremque in velit molestiae totam nam delectus repellendus assumenda, ad saepe quidem quo molestias voluptatibus. Quasi quaerat harum quidem accusantium repudiandae nulla fugiat? Quia amet nobis itaque asperiores ullam dolore similique?
                            </p>
                        </div>
                        <div id='church' className='col-md-10 offset-md-1'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='card bg-transparent'>
                                        <img src={this.state.church.image || '/img/people.jpeg'} alt='church' className='img-fluid img-responsive card-img-top'></img>
                                        <div className='card-body text-center'>
                                            <h3 className='card-title'>{this.state.church.name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='card bg-transparent'>
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item'>
                                                Email: 
                                                <span className='float-right italic text-muted'>{this.state.church.email}</span>
                                            </li>
                                            <li className='list-group-item'>
                                                Phone: 
                                                <span className='float-right italic text-muted'>{this.state.church.phone}</span>
                                            </li>
                                            <li className='list-group-item'>
                                                Address: 
                                                <span className='float-right italic text-muted'>{this.state.church.address}</span>
                                            </li>
                                            <li className='list-group-item'>
                                                <map id='map'></map>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-10 offset-md-1'>
                            <h3 className='text-primary'>Our Foundation</h3>
                            <p className='lead'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloremque in velit molestiae totam nam delectus repellendus assumenda, ad saepe quidem quo molestias voluptatibus. Quasi quaerat harum quidem accusantium repudiandae nulla fugiat? Quia amet nobis itaque asperiores ullam dolore similique?
                            </p>
                            <p className='lead'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloremque in velit molestiae totam nam delectus repellendus assumenda, ad saepe quidem quo molestias voluptatibus. Quasi quaerat harum quidem accusantium repudiandae nulla fugiat? Quia amet nobis itaque asperiores ullam dolore similique?
                            </p>
                        </div>
                        <div className='col-md-10 offset-md-1'>
                            <div className="row text-center">
                                <div className='col-md-6'>
                                    <img src='/img/mission.jpeg' alt='' width='70' height='70' className='img-circle'></img>
                                    <h3>Our Mision</h3>
                                    <p className='text-muted'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corrupti. Sapiente, voluptate. Minima, at blanditiis!
                                    </p>
                                </div>
                                <div className='col-md-6'>
                                    <img src='/img/vision.jpeg' alt='' width='70' height='70' className='img-circle'></img>
                                    <h3>Our Vision</h3>
                                    <p className='text-muted'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corrupti. Sapiente, voluptate. Minima, at blanditiis!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-10 offset-md-1' id='team'>
                            <h3 className='text-primary'>Our Team</h3>
                            <div class='row teams'>
                                <Members staff={this.state.staff} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}