import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Table, Button, Modal } from "react-bootstrap";
import {
  deleteUserSlice,
  fetchUsersSlice,
} from "../../redux/actions/authorsActions";
import {
  deleteBlogsByUserId,
  fetchBlogsByUserId,
  updateBlogStatus,
} from "../../redux/actions/blogAction";
import { useNavigate } from "react-router-dom";
import Header from "../common/header/Header";

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { posts } = useSelector((state) => state.blogs);

  const role = localStorage.getItem("role");
  console.log("users lsit", user);

  // Function to fetch blogs by user ID
  const fetchBlogs = (userId) => {
    const userBlogs = posts.filter((blog) => blog.userId === userId);
    return userBlogs.filter((blog) => blog.status === "pending");
  };

  // Function to handle view requests
  const handleViewRequests = (userId) => {
    setSelectedUserId(userId);
    setShowRequestsModal(true);
    const userBlogs = fetchBlogs(userId);
    setPendingBlogs(userBlogs);
  };

  // Function to handle accept request
  const handleAcceptRequest = (blogId) => {
    dispatch(updateBlogStatus({ postId: blogId, status: "accepted" }));
    const updatedBlogs = pendingBlogs.filter((blog) => blog.id !== blogId);
    setPendingBlogs(updatedBlogs);
  };

  // Function to close requests modal
  const handleCloseRequestsModal = () => {
    setShowRequestsModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsersSlice());
  }, [dispatch]);

  const generateRandomColor = () => {
    const letters = "BCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const handleViewBlogs = (userId) => {
    // Dispatch action to fetch blogs associated with the user ID
    dispatch(fetchBlogsByUserId(userId));
    console.log(
      "dispatch(fetchBlogsByUserId(userId))",
      dispatch(fetchBlogsByUserId(userId))
    );
    // Redirect to the blogs page
    navigate(`/blogs/${userId}`);
  };
  // // direct delete fun
  //   const handleDeleteUser = (userId) => {
  //     // Dispatch action to delete user
  //     dispatch(deleteUserSlice(userId));
  //     // Dispatch action to delete blogs associated with the user
  //     dispatch(deleteBlogsByUserId(userId));
  //   };

  const handleDeleteUser = (userId) => {
    // Set the user to delete and display confirmation dialog
    setUserToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = () => {
    // Dispatch action to delete user
    dispatch(deleteUserSlice(userToDelete)).then(() => {
      // Dispatch action to delete blogs associated with the user
      dispatch(deleteBlogsByUserId(userToDelete));
      // Dispatch action to fetch updated user list
      dispatch(fetchUsersSlice());
    });
    // Close the confirmation dialog
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteUser = () => {
    // Reset user to delete and hide confirmation dialog
    setUserToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="mt-5">
      <Header
        HeaderText="Authors Page"
        CaptionText="Welcome to the Authors Page of BlogApp. Here you can manage authors, view their blogs, and handle blog requests."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      <Table striped bordered hover className="m-4">
        <thead>
          <tr>
            <th className="col-3">First Name</th>
            <th className="col-3">Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map(
            (user) =>
              // Check if the user's role is not admin
              user.role !== "admin" && (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>

                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleViewBlogs(user.id)}
                    >
                      View Blogs
                    </Button>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleViewRequests(user.id)}
                    >
                      Requests
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>

      <Modal show={showRequestsModal} onHide={handleCloseRequestsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pending Blog Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingBlogs.map((blog) => (
            <div key={blog.id}>
              <p>{blog.title}</p>
              <Button
                variant="success"
                onClick={() => handleAcceptRequest(blog.id)}
              >
                Accept
              </Button>
              <Button variant="danger">Reject</Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRequestsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* for delete model */}
      <Modal show={showDeleteConfirmation} onHide={cancelDeleteUser} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteUser}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    // <div className="mt-5 mb-3">
    //   <h2>Authors</h2>
    //   <Row xs={1} md={2} lg={4} className="g-4">
    //     {user.map((user) => (
    //       <Col key={user.id}>
    //         <Card style={{ backgroundColor: generateRandomColor() }}>
    //           <Card.Body>
    //             <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </div>
  );
};

export default AuthorsPage;
