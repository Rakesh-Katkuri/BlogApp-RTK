import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogsByUserId,
  deleteSlice,
  getAllBlogsSlice,
} from "../../redux/actions/blogAction";
import Header from "../common/Header";

const UserBlogsPage = ({ userId }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBlogsByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await dispatch(deleteSlice(blogId));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const updatedPosts = posts.filter((blog) => blog.userId !== userId); // Filter out the deleted blog

  return (
    <div>
      <Header
        HeaderText="User Blogs"
        CaptionText="Start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas."
        textAlign="center"
        backgroundColor="#34495E"
        color="white"
      />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {updatedPosts.map((blog) => (
            <div key={blog.id} className="col mb-4">
              <div className="card h-100">
                <img src={blog.imageUrl} className="card-img-top" alt="Blog" />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBlogsPage;
//lkjhgf rtyui
