import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProfileModal = ({ show, handleClose, userData }) => {
  console.log("modal", userData);

  const userId = localStorage.getItem("userId");

  // Filter userData based on the user ID retrieved from localStorage
  const currentUser = userData.find((user) => user.id === userId);

  // Check if currentUser exists
  const isUserAvailable = !!currentUser;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isUserAvailable ? (
          <div>
            <p>ID: {currentUser.id}</p>
            <p>First Name: {currentUser.firstName}</p>
            <p>Last Name: {currentUser.lastName}</p>
            <p>Email: {currentUser.email}</p>
          </div>
        ) : (
          <p>User data not available or does not match the logged-in user.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
