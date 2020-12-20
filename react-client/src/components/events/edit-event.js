import React , {Component} from 'react'
import * as $ from 'jquery/dist/jquery';
import EventDataService from '../../services/event';
import MinistryDataService from '../../services/ministry';
import ErrorCard from '../partials/Card/ErrorCard';

export default class EditEvent extends Component{
    state = {
        event: {},
        ministries:[],
        error: {},
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
        this.retrieveEvent = this.retrieveEvent.bind(this);
        this.refreshEvent = this.refreshEvent.bind(this);
    }
    componentDidMount(){
        return this.retrieveEvent()
    }
    async retrieveEvent(){
        let event = await EventDataService.get(this.props.match.params.id);
        let ministries = await MinistryDataService.getAll();

        this.setState({
            event: event.data,
            ministries: ministries.data,
            error: event.error
        });
    }
    refreshEvent() {
        return this.retrieveEvent();
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
    async updateEvent(e){
        e.preventDefault();
        let event = {
            title: this.state.title || this.state.event.title,
            description: this.state.description || this.state.event.description,
            from: this.state.from || this.state.event.from,
            to: this.state.to || this.state.event.to,
            file: this.state.file? this.state.file: this.state.event.image,
            ministry_id: this.state.ministry_id? this.state.ministry_id: this.state.event.ministry_id
        }
        console.log(event)
        await EventDataService.update(this.props.match.params.id,event)
            .then(res=>{
                if(res.status === 200){
                   $('#edit-event-btn').text(res.data.message)   
                }
                else{
                    $('#event-form').prepend(`
                        <div class='alert alert-danger alert-dismissible' role='alert'>
                            <h4 class='alert-heading'>Error</h4>
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
        let {event, ministries, error} = this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshEvent} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Edit event</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='event-form' name='event-form'>
                            <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input className='form-control' id='title' name='title'
                                        placeholder='Enter event Title' required 
                                        defaultValue={event.title} onChange={this.onChangeTitle}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea className='form-control' id='description' name='description'
                                        placeholder='Enter event Description' required rows='5'
                                        defaultValue={event.description} onChange={this.onChangeDescription}></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='from'>From</label>
                                    <input type='date' className='form-control' id='from' name='from' 
                                        placeholder='Enter event from ' required
                                        defaultValue={event.from} onChange={this.onChangeFrom}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='to'>To</label>
                                    <input type='date' className='form-control' id='to' name='to' 
                                        placeholder='Enter event from ' required
                                        defaultValue={event.to} onChange={this.onChangeTo}></input>
                                </div>
                                <div className='form-group'>
                                    <img  src={event.image} className='img-fluid' width='50' height='50' alt=''></img>
                                    <label htmlFor='file'>Image File</label>
                                    <input type='file' className='form-control-file' id='file' name='file'
                                        accept='image/*' onChange={this.onChangeFile}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='ministry_id'>Select Ministry Involved</label>
                                    <select name='ministry_id' id ='ministry_id' className='form-control'
                                        defaultValue={event.ministry_id} onChange={this.onChangeMinistry}>
                                        {ministries.map(m => {
                                            return(
                                                <option value={m.id} key={m.id}>{m.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button type='submit' id='edit-event-btn' className='btn btn-lg btn-dark' onClick={this.updateEvent.bind(this)}>Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}