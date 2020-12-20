import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap.min.js";
import ResourceDataService from '../../services/resource';

export default class Resources extends Component {
    state = {
        stories: [],
        forms: [],
        eBooks: []
    }
    async componentDidMount(){
        let resources = await ResourceDataService.getAll();

       await this.setState({
            stories: resources.data.filter( r => r.type === 'story'),
            eBooks: resources.data.filter( r => r.type === 'e-book'),
            forms: resources.data.filter( r => r.type === 'form')
        })
    }
    render() {
        return(
            <section id='resources'>
                <h1 className='section-title text-center'>Resources</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1'>
                            <ul className="nav nav-tabs text-center">
                                <li>
                                    <Link className="nav-link active" to="#stories" data-toggle="pill">User Stories</Link>
                                </li>
                                <li>
                                    <Link className='nav-link' to="#e-books" data-toggle="pill">E-books</Link>
                                </li>
                                <li>
                                    <Link className='nav-link' to="#forms" data-toggle="pill">Forms</Link>
                                </li>
                            </ul>
                            <div className="tab-content my-2">
                                <div className="tab-pane active" id="stories">
                                    <Stories stories={this.state.stories} />
                                </div>
                                <div className="tab-pane" id="e-books">
                                    <EBooks eBooks={this.state.eBooks} />
                                </div> 
                                <div className="tab-pane" id="forms">
                                    <Forms forms={this.state.forms} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class Forms extends React.Component{
    render(){
        return(
            <table className='table table-light tab-bordered table-striped'>
                <thead className = 'bg-dark text-light'>
                    <tr>
                        <th>Form Name</th>
                        <th>Form Description</th>
                        <th>Modified</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.forms.map( form => {
                        return(
                            <tr key={form.id}>
                                <td>
                                    <h5>{form.title}</h5>
                                </td>
                                <td>
                                    <small className='text-muted text-wrap'>{form.description}</small>
                                </td>
                                <td className='small'>{form.updatedAt.slice(0,10)}</td>
                                <td className='text-center'>
                                    <ul className='list-inline'>
                                        <li className='list-inline-item'>
                                            <Link to={form.url} target='_BLANK' 
                                            className='list-group-item-action text-primary'>View</Link>
                                        </li>
                                        <li className='list-inline-item'>
                                            <Link to={form.url} download 
                                            className='list-group-item-action text-primary'>Download</Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
class Stories extends React.Component{
    render(){
        let stories = this.props.stories;
        return(
            <div className='card-columns'>
                {stories.map( story => {
                    return (
                        <div className='card bg-transparent' key={story.id}>
                            <div className='card-img-top'>
                                <img className='card-img' src={story.image} alt=''></img>
                                <div className='card-img-overlay'>
                                    <h3>{story.title}</h3>
                                </div>
                            </div>
                            <div className='card-body my-1'>
                                <p className='card-text'>{story.description}</p>
                                <Link to={`/resources/${story.id}`} className='card-link float-right' >Read</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class EBooks extends React.Component{
    render(){
        let books = this.props.eBooks;

        return(
            <div className='row'>
                {books.map( book => {
                    return(
                        <div className='col-md-4 mb-1'>
                            <div className='card bg-transparent h-100'>
                                <img className='card-img-top' src={book.image} alt=''></img>
                                <div className='card-body'>
                                    <h3 className='card-title'>{book.title}</h3>
                                    <h5 className='card-subtitle'>{book.description}</h5>
                                </div>
                                <div className='card-footer'>
                                    <Link to={`/resources/${book.id}`}  className='card-link mx-auto'
                                    download>Download</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

