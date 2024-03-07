import React from "react";
import { Modal, Button } from "react-bootstrap";
import defaultAvatar from "../../../assets/profile.jpg";

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
          <div className="profile-details">
            <div className="avatar text-center">
              <img
                src={currentUser.avatar || defaultAvatar}
                alt="User Avatar"
              />
            </div>
            <div className="user-info text-center m-5">
              <p>
                <strong>Name:</strong> {currentUser.firstName}{" "}
                {currentUser.lastName}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              {/* You can add more details here like user bio, location, etc. */}
            </div>
          </div>
        ) : (
          <p>User data not available.</p>
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
