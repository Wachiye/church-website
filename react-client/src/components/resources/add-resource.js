import React , {Component} from 'react'
import ResourceDataService from '../../services/resource';
import * as $ from '../partials/Card/ErrorCard';

export default class AddResource extends Component{
    state = {
        type:"story",
        title:"",
        description:"",
        content:"",
        url:"",
        file:{},
    }
    

    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.createResource = this.createResource.bind(this);
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
    onChangeContent(e){
        this.setState({
            content:e.target.value
        });
    }
    onChangeType(e){
        this.setState({
            type:e.target.value
        });
    }
    onChangeFile(e){
        this.setState({
            file:e.target.value
        });
    }
    onChangeUrl(e){
        this.setState({
            url:e.target.value
        });
    }
    async createResource(e){
        e.preventDefault();
        let resource = {
            title: this.state.title ,
            description: this.state.description ,
            content: this.state.content ,
            type: this.state.type ,
            file: this.state.file? this.state.file: null,
            url: this.state.url
        }
        console.log(resource);
        ResourceDataService.create(resource)
            .then(res=>{
                console.log(res)
                if(res.data){
                    $('#response-text').addClass('text-success').text(res.data.message); 
                }
                if(res.error){
                    $('#response-text').addClass('text-danger').text(res.error.message);
                }
            });
    }
    render() {
        let {title, description,content, type, file, url} = this.state;
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Create New Resource</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='resource-form' name='Resource-form'>
                                <div className='row'>
                                    <div className='col-lg-8 border-right'>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input className='form-control' id='title' name='title'
                                                placeholder='Enter Resource Title' required
                                                value={title} onChange={this.onChangeTitle}></input>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea className='form-control' id='description' name='description'
                                                placeholder='Enter Resource Description' required rows='5'
                                                value={description} onChange={this.onChangeDescription}></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='content'>Content</label>
                                            <textarea className='form-control' id='content' name='content'
                                                placeholder='Enter Resource Content here' rows='15' 
                                                value={content} onChange={this.onChangeContent}></textarea>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='form-group'>
                                            <label htmlFor='type'>Resource Type</label>
                                            <select name='type' id ='type'
                                                className='form-control' defaultValue={type} onChange={this.onChangeType}>
                                                <option value='story'>story</option>
                                                <option value='e-book'>e-book</option>
                                                <option value='form'>form</option>
                                            </select>
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label htmlFor='url'>url</label>
                                            <input type='url' className='form-control' id='url' name='url'
                                                placeholder='Enter Resource url ' 
                                                value={url} onChange={this.onChangeUrl}></input>
                                        </div>
                                        <div className='form-group'>
                                            <img id='previewImage' src='' alt='' width='90%' className='img-thumbnail mx-auto'></img>
                                            <label htmlFor='file'>Image File</label>
                                            <input type='file' className='form-control-file' id='file' name='file'
                                            onChange={this.onChangeFile}></input>
                                        </div>
                                        <div className='response' id='response my-1'>
                                            <p className='lead' id='response-text'></p>
                                        </div>
                                        <button type='submit' className='btn btn-sm btn-primary'
                                        onClick={this.createResource}>Publish</button>
                                        <button type='submit' className='btn btn-sm btn-dark ml-2'>Save Draft</button>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}