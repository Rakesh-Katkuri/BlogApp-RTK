import React, { useEffect } from "react";
import BlogList from "../blogList/BlogList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsSlice } from "../../../redux/actions/blogAction";
import Header from "../../common/header/Header";
import "../style.css";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { posts } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogsSlice());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    dispatch(getAllBlogsSlice());
  }, []);

  // Filter out pending blogs and only display accepted ones
  const acceptedBlogs = Array.isArray(posts)
    ? posts.filter((blog) => blog.status === "accepted")
    : [];

  return (
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Welcome to The Home Page"
        CaptionText="start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas."
        textAlign="center"
        backgroundColor="#34495E"
        color="white"
      />
      {acceptedBlogs?.length > 0 ? (
        <BlogList blogs={acceptedBlogs} />
      ) : (
        <p>No accepted blogs</p>
      )}
    </div>
  );
};

export default AllBlogs;
