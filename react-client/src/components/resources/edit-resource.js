import React , {Component} from 'react'

export default class EditResource extends Component{
    render() {
        return (
            <div id='main'>
                <h1 className='text-dark-50 text-center'>Edit Resource</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <form id='resource-form' name='resource-form'>
                            <div className='form-group'>
                                    <label htmlFor='type'>Resource Type</label>
                                    <select name='type' id ='type'
                                        className='form-control' defaultValue='story'>
                                        <option value='story'>story</option>
                                        <option value='e-book'>e-book</option>
                                        <option value='form'>form</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input className='form-control' id='title' name='title'
                                        placeholder='Enter Resource Title' required></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea className='form-control' id='description' name='description'
                                        placeholder='Enter Resource Description' required rows='5'></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='content'>Content</label>
                                    <textarea className='form-control' id='content' name='content'
                                        placeholder='Enter Resource Content here' required rows='15'></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='url'>url</label>
                                    <input type='url' className='form-control' id='url' name='url'
                                        placeholder='Enter Resource url ' ></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='file'>Image File</label>
                                    <input type='file' className='form-control-file' id='file' name='file'
                                     ></input>
                                </div>
                                <button type='submit' className='btn btn-lg btn-dark'>Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}