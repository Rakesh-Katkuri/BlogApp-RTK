import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyBlog from "./components/blogs/MyBlog";
import AddBlog from "./components/blogs/AddBlog";
import AuthProvider from "./authContext/AuthContext";
// import Login from "./userAuthentication/LoginForm";
// import Register from "./userAuthentication/RegisterForm";
import UpdatePostForm from "./components/blogs/UpdatePostFom";
import AllBlogs from "./components/blogs/AllBlogs";
import MyFavorites from "./components/common/MyFavorites";
import SearchedBlogs from "./components/common/SearchedBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetail from "./components/blogs/BlogDetail";
// import Footer from "./components/common/Footer";
import Navbar2 from "./components/common/Navbar2";
import "./App.css";
import PrivateRoute from "./private-route/PrivateRoute";
import Login from "./components/auth/LoginForm";
import Register from "./components/auth/RegisterForm";
import Footer from "./components/common/Footer";

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
        <AuthProvider>
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
          </Routes>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};
export default App;
