import React, { Component } from 'react';
import { Link } from "react-router-dom";
export default class PrivacyPolicy extends Component{
    render() {
        return (
            <section id='privacy-policy'>
                <h1 className='section-title'>Our Privacy Policy</h1>
                <div className='container'>
                    <div className='row'>
                        <div id='navigation' className='d-none d-md-block col-md-4'>
                            <h5>Quick Navigation</h5>
                            <ul className='nav-list'>
                                <li className='nav-item'>
                                    <Link to='#who-we-are' className='nav-link'>Who We Are</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#collection' className='nav-link'>Collection of Information</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#use' className='nav-link'>Use Of Information</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#sharing' className='nav-link'>Sharing Of Information</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#actions' className='nav-link'>Actions On Your Information</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#changes' className='nav-link'>Changes and Updates</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='#contacting' className='nav-link'>Contacting Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-8'>
                            <article id='who-we-are'>
                                <h2>Who We Are</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='collection'>
                                <h2>Collection Of Your Information</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='use'>
                                <h2>Use Of Your Information</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='sharing'>
                                <h2>Sharing Of Your Information</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='actions'>
                                <h2>Actions On Your Information</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='changes'>
                                <h2>Changes On The Website and related Services</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                            <article id='contact'>
                                <h2>Contacting Us</h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ducimus ab doloremque hic recusandae aliquid molestias tempore quod, nisi fugit perspiciatis quasi animi ex sapiente aspernatur sit distinctio praesentium quos architecto accusantium. Ut, animi obcaecati?
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}