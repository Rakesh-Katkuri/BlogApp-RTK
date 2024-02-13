import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import BlogForm from "../blog-form/BlogForm";
import { toast } from "react-toastify";
import { useAuth } from "../../authContext/AuthContext";
import Header from "../common/Header";
import BlogForm from "./BlogForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogsSlice,
  getByIdSlice,
  updateBlogSlice,
} from "../../redux/actions/blogAction";

const UpdatePostForm = () => {
  const { getMyBlogs } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.blogs);
  const { postId } = useParams();
  const [updatedPost, setUpdatedPost] = useState(post);
  const [author, setAthor] = useState("");

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setAthor(`${firstName} ${lastName}`);
    }
    dispatch(getByIdSlice(postId));
  }, []);

  useEffect(() => {
    // const postToUpdate = posts?.find((post) => post.id === parseInt(postId));
    // console.log("parseint", postId);
    // console.log("postToUpdate", postToUpdate);
    // if (postToUpdate) {
    setUpdatedPost(post);
    // }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
    console.log("handleInputChange", updatedPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    updatedPost.userId = userId;
    updatedPost.author = author;
    console.log("handleSubmit", updatedPost);
    const data = {
      id: parseInt(postId),
      ...updatedPost,
    };
    navigate("/my-blogs");
    dispatch(updateBlogSlice(data));
    dispatch(getAllBlogsSlice());
  };

  return (
    <>
      <Header
        HeaderText="Edit & Improve"
        CaptionText="Simple edits, big improvements. Enhance your log with ease"
        textAlign="center"
        backgroundColor="#F5F5F3"
      />

      <div className="editblog template d-flex justify-content-center align-items-center vh-100 ">
        <div className="form_container p-5 w-50 rounded-0 bg-white">
          <BlogForm
            postData={updatedPost}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            buttonText="Update Blog"
            author={author}
          />
        </div>
      </div>
    </>
  );
};
export default UpdatePostForm;
