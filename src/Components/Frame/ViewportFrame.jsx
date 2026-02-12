import React from "react";
import "./frame.css";
import frameImage from "./frame.png";

const ViewportFrame = () => {
    return (
        <div className="frame-overlay">
            <div className="frame-sticky">
                <img
                    src={frameImage}
                    alt="Torn film frame overlay"
                    className="frame-image"
                    draggable="false"
                />
            </div>
        </div>
    );
};

export default ViewportFrame;
