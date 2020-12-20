import React from "react";

const PreviewModal = ({ id, title, output, index}) => (
<div className='row'>
    <div className='col-md-8 offset-md-2'>
        <div className="modal fade show" id={id} tabIndex="-1" >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {title || 'Modal Preview'}
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true"><i className='fa fa-close'></i></span>
                    </button>
                    </div>
                    <div
                    className="modal-body"
                    dangerouslySetInnerHTML={{ __html: output }}
                    />
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        Done
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  
);

export default PreviewModal;
