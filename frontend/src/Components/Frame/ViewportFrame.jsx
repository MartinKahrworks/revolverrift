import React from "react";
import "./frame.css";
import borderTop from "../../assets/borders/border-top.png";
import borderBottom from "../../assets/borders/border-bottom.png";
import borderLeft from "../../assets/borders/border-left.png";
import borderRight from "../../assets/borders/border-right.png";

const ViewportFrame = () => {
    return (
        <>
            {/* Top border — z-40 so it sits BELOW the navbar (z-50) */}
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, pointerEvents: "none" }}>
                <img src={borderTop} className="frame-border frame-top" alt="" draggable="false" />
            </div>

            {/* Bottom + Left + Right borders — original z-9999 overlay */}
            <div className="frame-overlay">
                <img src={borderBottom} className="frame-border frame-bottom" alt="" draggable="false" />
                <img src={borderLeft} className="frame-border frame-left" alt="" draggable="false" />
                <img src={borderRight} className="frame-border frame-right" alt="" draggable="false" />
            </div>
        </>
    );
};

export default ViewportFrame;
