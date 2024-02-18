import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsSlice, getByIdSlice } from "../../redux/actions/blogAction";
import { updateMyFavorite } from "../../redux/actions/myFavoriteAction";
import { removeFromFavorites } from "../../redux/reducer/myFavoriteSlice";
import { updateLikes } from "../../redux/actions/likesAction";
import { decrement, increment } from "../../redux/reducer/likesSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import BlogDetail from "./BlogDetail";
import "./style.css";
// add search
const BlogList = ({ blogs, showButtons = true, likes }) => {
  const userId = localStorage.getItem("userId");
  const itemsPerRow = 3; // Adjust the number of items per row
  const itemsPerPage = 6; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [likesUpdated, setLikesUpdated] = useState(false); // State to track likes update

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatingFavorite, setUpdatingFavorite] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.myFavorites);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  useEffect(() => {
    dispatch(getAllBlogsSlice());
  }, []);

  // useEffect(() => {
  //   dispatch(getAllBlogsSlice());
  // }, [favorites]);

  const paginate = (pageNumber) => {
    setSelectedBlog(null); // Close the dropdown when paginating
    setCurrentPage(pageNumber);
  };

  const handleUpdateNew = (id) => {
    dispatch(getByIdSlice(id));
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    navigate(`/blog/${blog.id}`);
  };

  const handleLike = async (blogId) => {
    if (!userId) {
      // If user is not logged in, show toast message and return
      toast.warning("Please login to like the post", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await dispatch(updateLikes(blogId));
      const updatedPost = response.payload;

      // Check if the user liked the post
      const userLiked = updatedPost.likesBy.includes(userId);

      // Dispatch the appropriate action based on whether the user liked or unliked the post
      if (userLiked) {
        dispatch(increment()); // Increment likes count
        toast.success("Post Liked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        dispatch(decrement()); // Decrement likes count
        toast.info("Post Disliked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      // Set likes updated flag to trigger component re-render
      setLikesUpdated(!likesUpdated);
    } catch (error) {
      console.error("Error liking post", error);
      toast.error("Error liking post", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    dispatch(getAllBlogsSlice());
  };

  const handleFavorite = async (blogId) => {
    if (!userId) {
      // If user is not logged in, show toast message and return
      toast.warning("Please login to favorite the post", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      // Toggle the favorite status in the component state
      const isFavorited = favorites.some((item) => item.id == blogId);
      let updatedFavorites = [];
      if (isFavorited) {
        updatedFavorites = favorites.filter((item) => item.id !== blogId);
      } else {
        updatedFavorites = [...favorites, { id: blogId }];
      }

      // Update the component state immediately
      dispatch(updateMyFavorite(updatedFavorites));

      // Dispatch the action to update favorites in the Redux store
      if (isFavorited) {
        // Remove from favorites if already favorited
        await dispatch(removeFromFavorites(blogId));
        toast.success("Post removed from favorites", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Add to favorites if not favorited
        await dispatch(updateMyFavorite(blogId));
        toast.success("Post added to favorites", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      // Fetch blogs again to get the updated data
      dispatch(getAllBlogsSlice());
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Error updating favorites", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  //newwwm m k l
  // const handleFavorite = async (blogId) => {
  //   if (updatingFavorite) return; // Prevent concurrent updates
  //   try {
  //     setUpdatingFavorite(true); // Set updatingFavorite to true
  //     // Check if blogId is in favorites
  //     const isFavorited = favorites.some((item) => item.id == blogId);
  //     console.log("isFavorited", isFavorited);
  //     if (isFavorited) {
  //       // Remove from favorites if already favorited
  //       await dispatch(removeFromFavorites(blogId));

  //       console.log("Removed from favorites");
  //     } else {
  //       // Add to favorites if not favorited
  //       await dispatch(updateMyFavorite(blogId));
  //       console.log("Added to favorites");
  //     }
  //     dispatch(getAllBlogsSlice());
  //   } catch (error) {
  //     console.error("Error updating favorites:", error);
  //   } finally {
  //     setUpdatingFavorite(false); // Reset updatingFavorite to false
  //   }
  // };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3002/posts/${id}`).then((res) => {
      if (res.status === 200) {
        dispatch(getAllBlogsSlice());
      }
    });
  };

  const renderBlogs = () => {
    const rows = [];
    for (let i = 0; i < currentPosts.length; i += itemsPerRow) {
      const row = currentPosts.slice(i, i + itemsPerRow);
      rows.push(
        <div className="row custom-row ms-1 me-1 mb-2" key={i}>
          {row.map((blog) => (
            <div
              className={`custom-col-bg m-3 col-md-${12 / itemsPerRow}`}
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
                          blog.favorites?.includes(userId) ? "text-danger" : ""
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
