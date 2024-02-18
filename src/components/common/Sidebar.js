import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sidebar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/add-blog" className="nav-link">
            Add Blog
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/my-blogs" className="nav-link">
            My Blogs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/my-favorite/blogs" className="nav-link">
            My Favorites
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/authors-list" className="nav-link">
            Authors List
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
