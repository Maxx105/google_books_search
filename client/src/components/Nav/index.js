import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/search">
            React Reading List
        </Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/saved">Saved</Link>
                </li>
            </ul>
    </nav>
  );
}

export default Nav;