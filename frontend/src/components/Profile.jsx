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
      {/* <Modal.Header closeButton> */}
      {/* <Modal.Title>Your Info</Modal.Title> */}
      {/* </Modal.Header> */}
      {/* <Modal.Body> */}
      {/* {user.profilePicture && (
            <div className="mb-3">
              <center>
                <img src={image} alt="Profile Pic" width="30%" height="30%" />
              </center>
            </div>
          )} */}
      {/* <div className="mb-2">
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
          </div> */}
      {/* </Modal.Body> */}
      {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProfile}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      {/* =============== ========= */}
      <Modal show={show} onHide={handleClose} className="special_modal">
        <div className="max-w-2xl sm:max-w-sm  xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto my-2 bg-white shadow-xl rounded-lg text-gray-900  dark:bg-[#181e2f]">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden bg-white">
            <img
              className="object-cover object-center h-32"
              src="https://cdn3d.iconscout.com/3d/free/thumb/free-curly-hair-man-9606398-7766943.png"
              alt="Woman looking front"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
          {/* <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div>2k</div>
            </li>
            <li className="flex flex-col items-center justify-between">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
              </svg>
              <div>10k</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <div>15</div>
            </li>
          </ul> */}
          <div className="p-4 border-t border-slate-300 mx-8 mt-2">
            <button
              className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
