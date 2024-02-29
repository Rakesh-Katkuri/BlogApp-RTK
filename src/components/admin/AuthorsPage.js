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

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [pendingBlogs, setPendingBlogs] = useState([]);
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

  const handleDeleteUser = (userId) => {
    // Dispatch action to delete user
    dispatch(deleteUserSlice(userId));
    // Dispatch action to delete blogs associated with the user
    dispatch(deleteBlogsByUserId(userId));
  };

  return (
    <div className="mt-5">
      <h2>Authors</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
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
