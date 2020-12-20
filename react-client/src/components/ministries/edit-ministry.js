import React , {Component} from 'react'
import MinistryDataService from '../../services/ministry';
import * as $ from "jquery/dist/jquery";
import ErrorCard  from '../partials/Card/ErrorCard';

export default class EditMinistry extends Component{
    state = {
        ministry: {},
        error:{},
        name: "",
        description: "",
        file: {}
    }
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.updateMinistry = this.updateMinistry.bind(this);
        this.retrieveMinistry = this.retrieveMinistry.bind(this);
        this.refreshMinistry = this.refreshMinistry.bind(this);
    }
    componentDidMount(){
        return this.retrieveMinistry()
    }
    async retrieveMinistry(){
        MinistryDataService.get(this.props.match.params.id)
            .then(res => {
                this.setState({
                    ministry: res.data,
                    error: res.error
                });
            });

        
    }
    refreshMinistry() {
        return this.retrieveMinistry();
    }
    onChangeName(e){
        this.setState({
            name:e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }
    
    onChangeFile(e){
        this.setState({
            file:e.target.value
        });
    }
    
    updateMinistry(e){
        e.prMinistryDefault();
        let ministry_id = this.props.match.params.id;

        let data = {
            name: this.state.name || this.state.ministry.name ,
            description: this.state.description || this.state.ministry.description ,
            file: this.state.file || this.state.ministry.image
        }
        
        MinistryDataService.update(ministry_id, data)
            .then(res=>{
                console.log(res)
                if(res.status === 200){
                    $('#response-text').addClass('text-success').text(res.data.message); 
                }
                else{
                    $('#response-text').addClass('text-danger').text(res.data.message);
                }
            })
            .catch(err=>{
                console.log(err)
                $('#response-text').addClass('text-danger').text(err.message);
            });
    }
    render() {
        let {ministry, error}= this.state;
        if(error)  {
            return (
                <div id='main'>
                    <ErrorCard error={error} />
                    <div className='btn-group btn-group-sm'>
                        <button className='btn btn-secondary btn-sm'  onClick={this.refreshMinistry} title='Delete All'>
                            <i className='fa fa-refresh'> Refresh</i>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Edit Ministry</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='ministry-form' name='ministry-form'>
                            <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input className='form-control' id='name' name='name'
                                        placeholder='Enter ministry Name' required
                                        defaultValue={ministry.name} onChange={this.onChangeName}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea className='form-control' id='description' name='description'
                                        placeholder='Enter ministry description. Can be its main task' required rows='5'
                                        defaultValue={ministry.description} onChange={this.onChangeDescription}></textarea>
                    
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='file'>Image File</label>
                                    <input type='file' className='form-control-file' id='file' name='file'
                                        accept='image/*' onChange={this.onChangeFile} ></input>
                                </div>
                                <div className='response' id='response my-1'>
                                    <p className='lead' id='response-text'></p>
                                </div>
                                <button type='button' className='btn btn-lg btn-dark' onClick={this.updateMinistry}>Save Ministry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}