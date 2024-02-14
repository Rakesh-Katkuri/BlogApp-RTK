import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../authContext/AuthContext";
import BlogList from "../blogs/BlogList1";
import Header from "./Header";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducer/myFavoriteSlice";

const MyFavorites = () => {
  const { handleLike, deletePost } = useAuth();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);
  const userId = localStorage.getItem("userId");
  const { favorites } = useSelector((state) => state.myFavorites);
  console.log("favorites", favorites);
  // const userFavorites = favorites.filter((post) => favorites.includes(post.id));

  const handleFavorite = (blogId) => {
    if (favorites.includes(blogId)) {
      dispatch(removeFromFavorites(blogId));
    } else {
      // dispatch(addToFavorites(blogId));
    }
  };

  return (
    <div className="custom-bg">
      <Header
        HeaderText="Your Favorite Picks"
        CaptionText="Explore your curated collection of favorite blogs. Each one holds a special place in your reading journey."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      {favorites.length > 0 ? (
        <BlogList
          blogs={favorites}
          handleLike={handleLike}
          handleFavorite={handleFavorite}
          deletePost={deletePost}
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
//kkklk
