import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import BlogCard from "../blogs/BlogCard";
import "./SearchBlog.css";
import BlogList from "../blogs/BlogList";

const SearchedBlogs = ({ handleLike, handleFavorite, showButtons = true }) => {
  const { searchResults } = useSelector((state) => state.search);

  return (
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Search Results"
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      <BlogList
        blogs={searchResults}
        showButtons={showButtons}
        searchResultsMode={true} // Indicates that search results are being displayed
        handleLike={handleLike}
        handleFavorite={handleFavorite}
      />
    </div>
  );
  // const navigate = useNavigate();
  // const { searchResults } = useSelector((state) => state.search);

  // const handleCardClick = (blog) => {
  //   navigate(`/blog/${blog.id}`);
  // };

  // const customStyle = {
  //   backgroundColor: "#F5F5F3",
  // };

  // return (
  //   <div>
  //     <Header
  //       HeaderText="Search Results"
  //       textAlign="center"
  //       backgroundColor="#F5F5F3"
  //     />
  //     <div
  //       className="container d-flex justify-content-center align-items-center w-50"
  //       style={customStyle}
  //     >
  //       <div className="row custom-row">
  //         {searchResults.length > 0 ? (
  //           searchResults.map((post) => (
  //             <div className="col-md-12 mt-3" key={post.id}>
  //               <BlogCard
  //                 blog={post}
  //                 handleLike={handleLike}
  //                 handleFavorite={handleFavorite}
  //                 showButtons={showButtons}
  //                 handleCardClick={() => handleCardClick(post)}
  //               />
  //             </div>
  //           ))
  //         ) : (
  //           <div className="text-center bg-secondary">
  //             <h4>NO SEARCH RESULTS FOUND</h4>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SearchedBlogs;
