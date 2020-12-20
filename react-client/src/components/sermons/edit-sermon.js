import React, { Component } from "react";
import TextEditor from "../partials/TextEditor/SurmmernoteEditor";
import * as $ from "jquery/dist/jquery.slim";
import SermonDataService from "../../services/sermon";
import ErrorCard from "../partials/Card/ErrorCard";
import Modal from "../partials/Modal/Modal";

export default class EditSermon extends Component {
  state = {
    sermon: {},
    error: {},
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
    this.retrieveSermon = this.retrieveSermon.bind(this);
    this.refreshSermon = this.refreshSermon.bind(this);
    this.updateSermon = this.updateSermon.bind(this);
  }
  componentDidMount() {
    return this.retrieveSermon();
  }
  retrieveSermon() {
    SermonDataService.get(this.props.match.params.id).then((res) => {
      this.setState({
        sermon: res.data,
        error: res.error,
      });
    });
  }
  refreshSermon() {
    return this.retrieveSermon();
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

  updateSermon(e) {
    e.preventDefault();
    let { sermon, title, description, verse, content } = this.state;

    console.log(content);
    let data = {
      title: title || sermon.title,
      description: description || sermon.description,
      verse: verse || sermon.verse,
      content: content || sermon.content,
    };

    SermonDataService.update(sermon.id, data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let { sermon, error } = this.state;
    if (error) {
      return (
        <div id="main">
          <ErrorCard error={error} />
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-secondary btn-sm"
              onClick={this.refreshSermon}
              title="Delete All"
            >
              <i className="fa fa-refresh"> Refresh</i>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div id="main">
        <h1 className="text-dark-50 text-center">Edit Sermon</h1>
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
                    defaultValue={sermon.title}
                    onChange={this.onChangeTitle}
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>

                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter Sermon Description"
                    defaultValue={sermon.description}
                    onChange={this.onChangeDescription}
                    required
                    rows="5"
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
                    defaultValue={sermon.verse || "00:00"}
                    onChange={this.onChangeVerse}
                    required
                  ></input>
                  <span className="form-text text-info">
                    Leave as is if no verse
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <TextEditor
                    id="content"
                    content={sermon.content}
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
                <button
                  type="button"
                  className="btn btn-lg btn-dark"
                  onClick={this.updateSermon}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
