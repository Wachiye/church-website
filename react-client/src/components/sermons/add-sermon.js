import React, { Component } from "react";
import SermonDataService from "../../services/sermon";
import * as $ from "jquery/dist/jquery";
import Modal from "../partials/Modal/Modal";
import TextEditor from "../partials/TextEditor/SurmmernoteEditor";

export default class AddSermon extends Component {
  state = {
    title: "",
    description: "",
    verse: "",
    content: "",
  };
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVerse = this.onChangeVerse.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.createSermon = this.createSermon.bind(this);
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeVerse(e) {
    this.setState({
      verse: e.target.value,
    });
  }
  onChangeContent(content) {
    this.setState({
      content: content,
    });
  }

  createSermon(e) {
    e.preventDefault();

    let { title, description, verse, content } = this.state;

    let data = {
      title: title,
      description: description,
      verse: verse,
      content: content,
    };

    console.log(data);
    SermonDataService.create(data)
      .then((res) => {
        if (res.data) {
          $("#response-text").addClass("text-success").text(res.data.message);
        } else {
          $("#response-text").addClass("text-danger").text(res.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let { title, description, verse, content } = this.state;
    return (
      <div id="main">
        <h1 className="text-dark-50 text-center">Create New Sermon</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <form id="sermon-form" name="sermon-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter Sermon Title"
                    required
                    value={title}
                    onChange={this.onChangeTitle}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter Sermon Description"
                    required
                    rows="5"
                    value={description}
                    onChange={this.onChangeDescription}
                  ></textarea>
                  <span className="form-text text-info">
                    You can use text from the bible as description
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="verse">Verse</label>
                  <input
                    className="form-control"
                    id="verse"
                    name="verse"
                    placeholder="Enter Sermon Verse eg John 3:16"
                    required
                    value={verse}
                    onChange={this.onChangeVerse}
                  ></input>
                  <span className="form-text text-info">
                    Leave as is if no verse
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <TextEditor
                    id="content"
                    content={content}
                    changeFunction={this.onChangeContent}
                  />
                  <button
                    type="button"
                    className="btn btn-success my-1"
                    data-toggle="modal"
                    data-target="#text-editor-html"
                  >
                    <i className="fa fa-eye">Preview Editor Content</i>
                  </button>
                  <Modal id="text-editor-html" output={this.state.content} />
                </div>
                <div className="response my-1">
                  <p className="lead" id="response-text"></p>
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-dark"
                  onClick={this.createSermon}
                >
                  Publish Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
