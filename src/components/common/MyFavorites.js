import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../blogs/BlogList";
import Header from "./Header";
import { removeFromFavorites } from "../../redux/reducer/myFavoriteSlice";
import { updateLikes } from "../../redux/actions/likesAction";
import { increment } from "../../redux/reducer/likesSlice";
import { toast } from "react-toastify";

import "./Header.css";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { posts } = useSelector((state) => state.blogs);
  const { favorites } = useSelector((state) => state.myFavorites);

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

  const handleFavorite = (blogId) => {
    if (favorites.includes(blogId)) {
      // Remove from favorites if already favorited
      dispatch(removeFromFavorites(blogId));
    }
  };

  const filteredPosts = posts.filter((post) => favorites.includes(post.id));

  return (
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Your Favorite Picks"
        CaptionText="Explore your curated collection of favorite blogs. Each one holds a special place in your reading journey."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      {filteredPosts.length > 0 ? (
        <BlogList
          blogs={filteredPosts}
          handleLike={handleLikes}
          handleFavorite={handleFavorite}
        />
      ) : (
        <div className="text-center bg-secondary">
          <h1>No Favorite Blogs yet!</h1>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
