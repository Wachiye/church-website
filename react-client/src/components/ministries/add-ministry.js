import React , {Component} from 'react'
import MinistryDataService from '../../services/ministry';
import * as $ from "jquery/dist/jquery";

export default class AddMinistry extends Component{
    state = {
        name: "",
        description: "",
        file: {}
    }
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.createMinistry = this.createMinistry.bind(this);
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
    
    createMinistry(e){
        e.preventDefault();
        let ministry = {
            name: this.state.name ,
            description: this.state.description ,
            file: this.state.file? this.state.file: null
        }
        
        MinistryDataService.create(ministry)
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
        let { name, description} = this.state;
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Create New Ministry</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='ministry-form' name='ministry-form'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input className='form-control' id='name' name='name'
                                        placeholder='Enter ministry Name' required
                                        value={name} onChange={this.onChangeName}></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea className='form-control' id='description' name='description'
                                        placeholder='Enter ministry description. Can be its main task' required rows='5'
                                        value={description} onChange={this.onChangeDescription}></textarea>
                    
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='file'>Image File</label>
                                    <input type='file' className='form-control-file' id='file' name='file'
                                        accept='image/*' onChange={this.onChangeFile} ></input>
                                </div>
                                <div className='response' id='response my-1'>
                                    <p className='lead' id='response-text'></p>
                                </div>
                                <button type='button' className='btn btn-lg btn-dark' onClick={this.createMinistry}>Save Ministry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}