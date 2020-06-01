import React from 'react';

export const Loader = (props) => {
    return (
        <div className={props.center ? 'center' : ''} style={props.style}>
            <div className="preloader-wrapper small active center">
                <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
