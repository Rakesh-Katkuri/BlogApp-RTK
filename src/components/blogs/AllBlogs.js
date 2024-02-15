import React, { useEffect } from "react";
import "./style.css";
import BlogList from "./BlogList";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsSlice } from "../../redux/actions/blogAction";
import { updateLikes } from "../../redux/actions/likesAction";
import { increment, decrement } from "../../redux/reducer/likesSlice";
import { updateMyFavorite } from "../../redux/actions/myFavoriteAction";

const AllBlogs = () => {
  //Retrieving the userId from LocalStorage
  const userId = localStorage.getItem("userId");
  const location = useLocation(); // Get the current location

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);
  const { likes } = useSelector((state) => state.likes); // Get the likes from the Redux store
  console.log("useSelector", posts);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(getAllBlogsSlice());
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, [location.pathname]);

  const handleLikes = (blogId) => {
    dispatch(updateLikes(blogId))
      .unwrap()
      .then(() => {
        dispatch(increment()); // Dispatch increment action after liking the post
      })
      .catch((error) => {
        console.error("Error liking post", error);
        toast.error("Error liking post", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  const handleFavorites = (blogId) => {
    dispatch(updateMyFavorite(blogId));
  };

  //rendering all blog posts
  return (
    <>
      {/* <AutoCarousel /> */}

      <div className="mt-2 custom-bg pt-5">
        <Header
          HeaderText="Welcome to Our Blog"
          CaptionText="start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas."
          textAlign="center"
          backgroundColor="#34495E"
          color="white"
        />
        {posts?.length > 0 ? (
          <BlogList
            blogs={posts}
            handleLike={handleLikes}
            handleFavorite={handleFavorites}
            deletePost={posts}
            showButtons={false}
            likes={likes}
          />
        ) : (
          <p>no blogs</p>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
