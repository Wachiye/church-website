import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Modal from "../Modal/Modal";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//
class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.content;
    const contentBlock = htmlToDraft(html);
    console.log(contentBlock);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);

      this.state = {
        editorState,
      };
    }
  }
  componentDidMount() {
    this.setState({ editorState: this.props.content });
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  // getHtml = editorState => {
  //   return convertToRaw(editorState.getCurrentState());
  // }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        {" "}
        <Editor
          editorState={editorState}
          wrapperClassName="card"
          editorClassName="card-body"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="The message goes here..."
        />{" "}
        <div className="html-view"> ... </div>{" "}
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#previewModal"
        >
          Preview
        </button>
        {/* <Modal output={this.getHtml(editorState)} /> */}
      </div>
    );
  }
}
export default RichTextEditor;
