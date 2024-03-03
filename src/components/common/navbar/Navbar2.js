//changed to material ui
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../redux/reducer/searchSlice";
import { Button, Modal } from "react-bootstrap";
//redux
import ProfileModal from "../profile/ProfileModal";
import { fetchUsersSlice } from "../../../redux/actions/authorsActions";

const Navbar2 = () => {
  const { posts } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.users);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // State for handling the profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //for search blogs
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();

    if (term.trim() === "") {
      // navigate("/")
      toast.warning("Please enter a search term before searching.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const filteredPosts = posts.filter(
        (post) =>
          // post.imageUrl.toLowerCase().includes(term) ||
          post.title.toLowerCase().includes(term)
        // ||
        // post.description.toLowerCase().includes(term)
      );
      dispatch(setSearchResults(filteredPosts));
      setSearchTerm("");
      navigate("/search-results");
      // navigate("/search-results", { state: { searchResults: filteredPosts } });
    }
  };

  const handleLogout = () => {
    // Remove userId from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("role");
    toast.dark("Logout successful.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    // Redirect to the login page
    navigate("/");
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const customStyle = {
    backgroundColor: "#1D5356",

    // height: "8rem",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
  };
  const customLogo = {
    // color: "#F4DEC9",
    fontSize: "2rem",
  };
  // const customLogin = {
  //   color: "black",
  //   fontSize: "1rem",
  // };

  // Function to handle opening the profile modal
  // Function to handle opening the profile modal
  const handleOpenProfileModal = () => {
    // Dispatch an action to fetch user data
    dispatch(fetchUsersSlice());
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <header>
      <nav style={customStyle} class="navbar fixed-top navbar-expand-lg p-3">
        <div class="container-fluid">
          <Link to="/" class=" navbar-brand">
            <h2>
              <strong style={customLogo} className="ms-2 text-white">
                Blog App
              </strong>
            </h2>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse text-white"
            id="navbarSupportedContent"
          >
            {/* <form class="d-flex mx-auto" role="search">
              <input
                class="form-control rounded-5 me-0"
                type="search"
                aria-label="Search"
                // type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value) || setSearchActive(true)
                }
              />
              <button
                class="btn btn-success rounded-5 bg-black"
                type="submit"
                onClick={handleSearch}
                disabled={!searchActive}
              >
                Search
              </button>
            </form> */}

            <div class="col-md-5 mx-auto">
              <div class="input-group">
                <input
                  class="form-control border-end-0 border rounded-pill"
                  type="search"
                  value={searchTerm}
                  id="example-search-input"
                  onChange={(e) =>
                    setSearchTerm(e.target.value) || setSearchActive(true)
                  }
                />
                {/* <span class="input-group-append"> */}

                <button
                  class="btn btn-outline-secondary border-bottom-0 border rounded-pill ms-n5"
                  type="button"
                  onClick={handleSearch}
                  disabled={!searchActive}
                >
                  <i class="fa fa-search"></i>
                </button>

                {/* </span> */}
              </div>
            </div>

            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              {userId ? (
                <div className="container me-2">
                  <li className="nav-item dropdown-center ">
                    <i
                      className="fa-regular fa-id-badge text-white fs-3 nav-link text-end"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul class="dropdown-menu dropdown-menu-end rounded-0">
                      <li>
                        {role === "admin" ? (
                          <strong className="ms-4">ADMIN</strong>
                        ) : (
                          <strong className="ms-4">USER</strong>
                        )}
                        <hr className="my-1" /> {/* Add horizontal line here */}
                      </li>
                      <li className="dropdown-item">
                        <Link
                          to=""
                          onClick={handleOpenProfileModal}
                          className={
                            activeLink === "" ? "nav-link active" : "nav-link"
                          }
                        >
                          profile
                        </Link>
                      </li>

                      {/* authors */}
                      {role === "admin" ? (
                        <li className="dropdown-item">
                          <Link
                            to="/authors-list"
                            className={
                              activeLink === "/my-favorite/blogs"
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => handleLinkClick("/authors-list")}
                          >
                            DashBoard
                          </Link>
                        </li>
                      ) : null}
                      {/* authors */}
                      <hr className="my-1" />

                      <li className="dropdown-item">
                        <Link
                          to="/add-blog"
                          className={
                            activeLink === "/add-blog"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/add-blog")}
                        >
                          Add Blog
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                          to="/my-blogs"
                          className={
                            activeLink === "/my-blogs"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/my-blogs")}
                          aria-current="page"
                        >
                          My Blogs
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                          to="/my-favorite/blogs"
                          className={
                            activeLink === "/my-favorite/blogs"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/my-favorite/blogs")}
                        >
                          My Favorites
                        </Link>
                      </li>
                      <hr className="my-1" />

                      <li className="dropdown-item ">
                        <Link
                          to="/login"
                          className="nav-link active"
                          aria-current="page"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li className="profileHover ">
                  <Link
                    to="/login"
                    className="
                      btn rounded-0 custom-loginbtn"
                    //  activeLink === "/login" ? "nav-link active" : "nav-link"

                    onClick={() => handleLinkClick("/login")}
                  >
                    LOGIN
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
        userData={user} // Pass the user data to the ProfileModal component
      />
    </header>
  );
};

export default Navbar2;
