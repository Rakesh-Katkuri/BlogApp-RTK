import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../blogs/BlogList";
import Header from "./Header";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducer/myFavoriteSlice";
import { useParams } from "react-router-dom";
import { updateLikes } from "../../redux/actions/likesAction";
import { increment } from "../../redux/reducer/likesSlice";
import { toast } from "react-toastify";
// import { fetchFavorites } from "../../redux/actions/myFavoriteAction";

const MyFavorites = () => {
  const dispatch = useDispatch();
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
  // useEffect(() => {
  //   dispatch(fetchFavorites(userId));
  // }, [dispatch, userId]);

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
//kkklk
