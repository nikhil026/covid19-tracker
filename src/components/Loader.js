import React from 'react';

export const Loader = (props) => {
    return (
        <div className={props.center ? 'center' : ''} style={props.style}>
            <div className="spinner">
                <div style={{ backgroundColor: props.color }} className="bounce1"></div>
                <div style={{ backgroundColor: props.color }} className="bounce2"></div>
                <div style={{ backgroundColor: props.color }} className="bounce3"></div>
            </div>
        </div>
    )
}
