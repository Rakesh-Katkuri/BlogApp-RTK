import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyBlog from "./components/blogs/myBlogs/MyBlog";
import AddBlog from "./components/blogs/addBlog/AddBlog";
import UpdatePostForm from "./components/blogs/updateBlog/UpdatePostFom";
import AllBlogs from "./components/blogs/allBlogs/AllBlogs";
import MyFavorites from "./components/common/favorites/MyFavorites";
import SearchedBlogs from "./components/common/search/SearchedBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetail from "./components/blogs/blogDetail/BlogDetail";
import Navbar2 from "./components/common/navbar/Navbar2";
import "./App.css";
import PrivateRoute from "./private-route/PrivateRoute";
import Login from "./components/auth/login/LoginForm";
import Register from "./components/auth/register/RegisterForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import AuthorsPage from "./components/admin/AuthorsPage";
import UserBlogsPage from "./components/admin/UserBlogsPage";
import Footer from "./components/common/footer/Footer";

const App = () => {
  const userId = localStorage.getItem("userId");
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const toastShown = localStorage.getItem("toastShown");

    if (!userId && !toastShown) {
      toast.error("Authentication required. Please log in to access page.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setToastShown(true);
      localStorage.setItem("toastShown", "true");
    }
  }, [userId]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar2 />

        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <AllBlogs />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-blogs"
            element={
              <PrivateRoute>
                <MyBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-blog"
            element={
              <PrivateRoute>
                <AddBlog />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/update/:postId"
            element={
              <PrivateRoute>
                <UpdatePostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-favorite/blogs"
            element={
              <PrivateRoute>
                <MyFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <PrivateRoute>
                <BlogDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/search-results"
            element={
              <PrivateRoute>
                <SearchedBlogs />
              </PrivateRoute>
            }
          />
          {/* admin */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/authors-list"
            element={
              <PrivateRoute>
                <AuthorsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/:userId"
            element={
              <PrivateRoute>
                <UserBlogsPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};
export default App;
