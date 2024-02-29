import React, { useEffect } from "react";
import "./style.css";
import BlogList from "./BlogList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsSlice } from "../../redux/actions/blogAction";
import Header from "../common/Header";

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

  return (
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Welcome to The Home Page"
        CaptionText="start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas."
        textAlign="center"
        backgroundColor="#34495E"
        color="white"
      />
      {posts?.length > 0 ? <BlogList blogs={posts} /> : <p>No blogs</p>}
    </div>
  );
};

export default AllBlogs;
