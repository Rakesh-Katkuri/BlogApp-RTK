import React, { useEffect, useState } from "react";
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
import { removeFromFavorites } from "../../redux/reducer/myFavoriteSlice";

const AllBlogs = () => {
  //Retrieving the userId from LocalStorage
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  const location = useLocation(); // Get the current location
  const [updatingFavorite, setUpdatingFavorite] = useState(false);
  const { posts } = useSelector((state) => state.blogs);
  const { likes } = useSelector((state) => state.likes); // Get the likes from the Redux store
  console.log("useSelector", posts);
  const { favorites } = useSelector((state) => state.myFavorites);

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

  const handleFavorites = async (blogId) => {
    if (updatingFavorite) return; // Prevent concurrent updates
    try {
      setUpdatingFavorite(true); // Set updatingFavorite to true
      // Check if blogId is in favorites
      const isFavorited = favorites.some((item) => item.id == blogId);
      console.log("isFavorited", isFavorited);
      if (isFavorited) {
        // Remove from favorites if already favorited
        await dispatch(removeFromFavorites(blogId));
        console.log("Removed from favorites");
      } else {
        // Add to favorites if not favorited
        await dispatch(updateMyFavorite(blogId));
        console.log("Added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setUpdatingFavorite(false); // Reset updatingFavorite to false
    }
  };

  //rendering all blog posts
  return (
    <>
      {/* <AutoCarousel /> */}

      <div className="mt-0 custom-bg">
        <Header
          HeaderText="Welcome to The Home Page"
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
