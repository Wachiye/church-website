import React , {Component} from 'react'
import * as $ from 'jquery/dist/jquery';
import EventDataService from '../../services/event';
import MinistryDataService from '../../services/ministry';
import { Link } from 'react-router-dom';

export default class EditEvent extends Component{
    state = {
        ministries:[],
        title: "",
        description: "",
        from: new Date(),
        to: new Date(),
        file: {},
        ministry_id:""
    }
    

    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeMinistry = this.onChangeMinistry.bind(this);
    }
    async componentDidMount(){
        let ministries = await MinistryDataService.getAll();

        this.setState({
            ministries: ministries.data
        });
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }
    onChangeFrom(e){
        this.setState({
            from:e.target.value
        });
    }
    onChangeTo(e){
        this.setState({
            to:e.target.value
        });
    }
    onChangeFile(e){
        this.setState({
            file:e.target.value
        });
    }
    onChangeMinistry(e){
        this.setState({
            ministry_id:e.target.value
        });
    }
    async createEvent(e){
        e.preventDefault();
        let event = {
            title: this.state.title ,
            description: this.state.description ,
            from: this.state.from ,
            to: this.state.to ,
            file: this.state.file? this.state.file: null,
            ministry_id: this.state.ministry_id? this.state.ministry_id: null
        }
        console.log(event)
        await EventDataService.create(event)
            .then(res=>{
                console.log(res)
                if(res.status === 200){
                    $('#add-event-btn').text(res.data.message);
                    $('#events-link').removeClass('d-none'); 
                }
                else{
                    console.log(res.data)
                    $('#event-form').prepend(`
                        <div class='alert alert-success alert-dismissible' role='alert'>
                            <h4 class='alert-heading'>Event Added</h4>
                            <button type='button' class='close'  data-dismiss='alert' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <p>${res.data.message}</p>
                        </div>`
                    );
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render() {
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Add New event</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='event-form' name='event-form'>
                            <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input className='form-control' id='title' name='title'
                                        placeholder='Enter event Title' required 
                                        value={this.state.title} onChange={this.onChangeTitle}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea className='form-control' id='description' name='description'
                                        placeholder='Enter event Description' required rows='5'
                                        value={this.state.description} onChange={this.onChangeDescription}></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='from'>From</label>
                                    <input type='date' className='form-control' id='from' name='from' 
                                        placeholder='Enter event from ' required
                                        value={ this.state.from} onChange={this.onChangeFrom}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='to'>To</label>
                                    <input type='date' className='form-control' id='to' name='to' 
                                        placeholder='Enter event from ' required
                                        value={this.state.to} onChange={this.onChangeTo}></input>
                                </div>
                                <div className='form-group'>
                                    <img  src={this.state.image} className='img-fluid' width='50' height='50' alt=''></img>
                                    <label htmlFor='file'>Image File</label>
                                    <input type='file' className='form-control-file' id='file' name='file'
                                        accept='image/*' onChange={this.onChangeFile}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='ministry_id'>Select Ministry Involved</label>
                                    <select name='ministry_id' id ='ministry_id' className='form-control'
                                        value={this.state.ministry_id} onChange={this.onChangeMinistry}>
                                        {this.state.ministries.map(m => {
                                            return(
                                                <option value={m.id} key={m.id}>{m.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button type='submit' id='add-event-btn' className='btn btn-lg btn-dark' 
                                onClick={this.createEvent.bind(this)}>Publish Event</button>
                                <Link id='events-link' to='/events' className='d-none  mx-1 btn btn-primary btn-lg'>View Events</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}