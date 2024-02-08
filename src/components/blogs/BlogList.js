import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import "./style.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  deleteSlice,
  getAllBlogsSlice,
  getByIdSlice,
} from "../../redux/actions/blogAction";
import axios from "axios";

const BlogList = ({
  blogs,
  handleLike,
  handleFavorite,
  deletePost,
  showButtons = true,
}) => {
  const userId = localStorage.getItem("userId");
  const itemsPerRow = 3; // Adjust the number of items per row
  const itemsPerPage = 6; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const { getMyBlogs } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setSelectedBlog(null); // Close the dropdown when paginating
    setCurrentPage(pageNumber);
  };

  const handleUpdateNew = (id) => {
    dispatch(getByIdSlice(id));
    // setSelectedBlog(null); // Close the dropdown after updating
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    navigate(`/blog/${blog.id}`);
  };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const deleteHandler = (id) => {
    const response = axios.delete(`http://localhost:3002/posts/${id}`);
    console.log(response);
    if (response) {
      dispatch(getAllBlogsSlice());
    }
    // dispatch(deleteSlice(id));
    setSelectedBlog(null);
  };

  const renderBlogs = () => {
    const rows = [];
    for (let i = 0; i < currentPosts.length; i += itemsPerRow) {
      const row = currentPosts.slice(i, i + itemsPerRow);
      rows.push(
        <div className="row custom-row ms-1 me-1 mt-3 mb-2" key={i}>
          {row.map((blog) => (
            <div
              className={`custom-col-bg col-md-${12 / itemsPerRow}`}
              key={blog.id}
            >
              <div className="card rounded-0 m-1">
                {/* Title and Three Dots in the same row */}
                <div className="card-header d-flex justify-content-between align-items-center">
                  {blog.author && (
                    <div className="author-date-container d-flex align-items-center">
                      <div className="profile-circle rounded-circle d-flex justify-content-center align-items-center me-3">
                        {blog.author.substring(0, 1).toUpperCase()}
                      </div>
                      <div className="author-date">
                        <div className="author">
                          <strong>{capitalizeFirstLetter(blog.author)}</strong>
                        </div>
                        <div className="date mb-2">
                          published on : {blog.date}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="dropdown">
                    {showButtons && blog.userId === userId && (
                      <button
                        className="btn btn-secondary rounded-0 p-1 custom-ellipsis"
                        type="button"
                        id={`dropdownMenuButton-${blog.id}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    )}
                    <div
                      className={`dropdown-menu dropdown-menu-end rounded-0 ${
                        selectedBlog === blog ? "show" : ""
                      }`}
                      aria-labelledby={`dropdownMenuButton-${blog.id}`}
                    >
                      {/* Edit Button */}
                      <Link to={`/update/${blog.id}`}>
                        <button
                          onClick={() => handleUpdateNew(blog.id)}
                          className="dropdown-item"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteHandler(blog.id)}
                        className="dropdown-item"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="">
                  <img
                    src={blog.imageUrl}
                    className="card-img-top img-fluid rounded-0 mw-100 mh-100 blog-image"
                    alt="image blog"
                  />
                  <h4 className="blog-title mt-3">
                    {capitalizeFirstLetter(blog.title)}
                  </h4>
                  <p className="blog-description mt-3">
                    {capitalizeFirstLetter(blog.description)}
                  </p>
                </div>

                {/* Like and Favorite Buttons */}

                {/* Description */}
                <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                  {/* <div className="row  text-center custom-like-fav"> */}
                  <div className="col-sm-6 ">
                    {blog.likes}
                    <button
                      className="custom-interaction-button "
                      onClick={() => handleLike(blog.id)}
                    >
                      <i
                        className={`fas fa-thumbs-up me-4 fs-5 ${
                          blog.likesBy && blog.likesBy.includes(userId)
                            ? "text-primary"
                            : ""
                        }`}
                      ></i>
                    </button>
                    <button
                      className="custom-interaction-button"
                      onClick={() => handleFavorite(blog.id)}
                    >
                      <i
                        className={`fas fa-heart fs-5 ${
                          blog.favorites.includes(userId) ? "text-danger" : ""
                        }`}
                      ></i>
                    </button>
                  </div>

                  <div className="col-sm-6 custom-rd-btn p-2 text-danger-hover">
                    {/* Use Link component instead of the Read More button */}
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-decoration-none custom-readmore"
                    >
                      Read More
                    </Link>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div>
      {selectedBlog ? (
        <BlogDetail blog={selectedBlog} />
      ) : (
        <>
          {renderBlogs()}
          <nav className="d-flex justify-content-center p-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      pageNumber === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default BlogList;
