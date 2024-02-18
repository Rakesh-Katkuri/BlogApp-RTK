import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import {
  deleteUserSlice,
  fetchUsersSlice,
} from "../../redux/actions/authorsActions";
import { deleteBlogsByUserId } from "../../redux/actions/blogAction";
const AuthorsPage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);
  const role = localStorage.getItem("role");
  console.log("users lsit", user);

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
