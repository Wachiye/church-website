import React from "react";

const PreviewCard = ({ header, body}) => (
    <div className='card bg-transparent'>
        {header? (
            <div className='card-header' dangerouslySetInnerHTML={{ __html: header }}></div>
        ):(null)
        }
        <div className='card-body' dangerouslySetInnerHTML={{ __html: body }}></div>
    </div> 
);

export default PreviewCard;
