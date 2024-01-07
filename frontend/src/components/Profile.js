import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { updateUserInfo } from "../apicalls/users";
import { getUserDetails } from "../redux/actions/userActions";

function Profile(props) {
  const { show, setShow, handleClose, handleShow } = props;
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profilePicture);
  const [desc, setDesc] = useState(user.description);
  const dispatch = useDispatch();
  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setImage(reader.result);
    };
  };
  const updateProfile = async () => {
    const updatedUserObj = {
      image,
      desc,
    };
    try {
      handleClose();
      message.loading("Updating user info...", 0.5);
      const response = await updateUserInfo(updatedUserObj);
      if (response.success) {
        setTimeout(() => {
          message.success("User info updated successfully.");
          dispatch(getUserDetails(response.data));
          message.success("User info fetched successfully.");
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        handleClose();
        message.error(error);
      }, 500);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.profilePicture && (
            <div className="mb-3">
              <center>
                <img src={image} alt="Profile Pic" width="30%" height="30%" />
              </center>
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={true}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={true}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput3"
              placeholder="Enter your description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput4" className="form-label">
              Profile Pic
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="exampleFormControlInput4"
              // placeholder="Enter your recent profile pic"
              // value={image}
              onChange={onFileSelect}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
