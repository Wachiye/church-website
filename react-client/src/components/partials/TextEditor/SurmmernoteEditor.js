import React, { Component } from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles

//Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "../Modal/Modal";
class RichTextEditor extends Component {
  state = {
    content: "",
  };
  
  componentDidMount() {
    this.setState({
      content: this.props.content,
    });
  }
  render() {
    return (
      <div className="text-editor">
        <ReactSummernote
          id="text-editor"
          value={this.state.content}
          onChange={this.props.changeFunction}
        />
      </div>
    );
  }
}

export default RichTextEditor;
