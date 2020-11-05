import React from "react";
import "./style.css";

function Results({ children }) {
    return (
        <div className="results">
            <h3>Results</h3>
            <div>{children}</div>
        </div>
    );
}

export default Results;