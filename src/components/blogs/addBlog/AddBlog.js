import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlogSlice } from "../../../redux/actions/blogAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BlogForm from "../blogForm/BlogForm";
import Header from "../../common/header/Header";
import "../style.css";

const AddBlog = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [posts, setPosts] = useState({
    likes: 0,
    likesBy: [],
    favorites: [],
    date: getCurrentDate(),
    status: "pending", // Set the initial status to "pending"
  });
  const [author, setAthor] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    posts.userId = userId;
    posts.author = author;

    dispatch(addBlogSlice(posts));

    toast.success("Blog added successfully !.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

    navigate("/");
  };

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setAthor(`${firstName} ${lastName}`);
    }
  }, []);

  return (
    <>
      <div className="mt-0 custom-bg">
        <Header
          HeaderText="Create Your Blog Here"
          CaptionText="At PixelPoet, Create your blog, share your Ideas, and become a part of our writing community. Your creativity our platform"
          textAlign="center"
          backgroundColor="#F5F5F3"
        />

        <div className="addblog template d-flex justify-content-center align-items-center vh-100 ">
          <div className="form_container p-5 w-50 rounded-0 bg-white">
            <BlogForm
              postData={posts}
              onChange={handleChangeInput}
              onSubmit={handlePost}
              buttonText="Add Post"
              author={author}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
