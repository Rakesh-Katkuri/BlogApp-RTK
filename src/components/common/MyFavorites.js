import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../blogs/BlogList";
import Header from "./Header";
import { removeFromFavorites } from "../../redux/reducer/myFavoriteSlice";
import { toast } from "react-toastify";
import "./Header.css";
import { getAllBlogsSlice } from "../../redux/actions/blogAction";

const MyFavorites = () => {
  // const [refreshFavorites, setRefreshFavorites] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);
  const { favorites } = useSelector((state) => state.myFavorites);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getAllBlogsSlice());
    console.log("myfavorite page useEffect");
  }, [dispatch]);

  // const filteredPosts = posts.filter((post) => favorites.includes(post.id));
  // Filter posts based on whether the favorites field includes the current user's ID
  const filteredPosts = posts.filter((post) => {
    return post.favorites && post.favorites.includes(userId);
  });
  console.log("Filtered Posts:", filteredPosts);

  return (
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Your Favorite Picks"
        CaptionText="Explore your curated collection of favorite blogs. Each one holds a special place in your reading journey."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      {filteredPosts.length > 0 ? (
        <BlogList blogs={filteredPosts} />
      ) : (
        <div className="text-center bg-secondary">
          <h1>No Favorite Blogs yet!</h1>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
