import React from 'react';

function Image ({children, src, alt}) {
    return (
        <React.Fragment>
            <img src={src} alt={alt} />
        </React.Fragment>
    );
}

export default Image;