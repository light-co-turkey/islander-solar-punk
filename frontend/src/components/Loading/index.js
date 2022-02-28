import React from 'react';
import "./loading.css"

const Loading = className => (
    <div className={className + " p-3"}>
        <div className="df w-100 jc-c ai-c">
        <div className="fingerprint-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
        </div>
        </div>
    </div>
);

export default Loading;