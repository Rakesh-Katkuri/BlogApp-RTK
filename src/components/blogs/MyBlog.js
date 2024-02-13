import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { useAuth } from "../../authContext/AuthContext";
import Header from "../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsSlice } from "../../redux/actions/blogAction";
import likesSlice from "../../redux/reducer/likesSlice";

function MyBlog() {
  const { deletePost, handleLike, handleFavorite } = useAuth();
  const { posts } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  console.log("my blog post data", posts);

  const userId = localStorage.getItem("userId");

  const myBlog = posts?.filter((item) => item.userId === userId);
  console.log(myBlog, "rakesh");
  const handleLikes = (blogId) => {
    dispatch(likesSlice(blogId));
  };
  const handleFavorites = (blogId) => {
    handleFavorite(blogId);
  };

  useEffect(() => {
    console.log("myblogs useeffect");
    dispatch(getAllBlogsSlice());
  }, []);

  return (
    <>
      <div className="mt-0 custom-bg">
        <Header
          HeaderText="Explore Your Blogs"
          CaptionText="Discover the stories and moments you've shared. Your Blogs, Your Narrative"
          textAlign="center"
          backgroundColor="#F5F5F3"
        />

        {myBlog.length > 0 ? (
          <BlogList
            blogs={myBlog}
            handleLike={handleLikes}
            handleFavorite={handleFavorites}
            deletePost={deletePost}
          />
        ) : (
          <p>no blogs</p>
        )}
      </div>
    </>
  );
}

export default MyBlog;
