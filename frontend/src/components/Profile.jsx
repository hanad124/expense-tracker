import {
  addDoc,
  getDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { updateUserName, updateUserImage } from "../apicalls/users";

import noImage from "../assets/no-image.jpeg";

function Profile(props) {
  const { show, setShow, handleClose, handleShow } = props;
  const [file, setFile] = useState("");
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const [name, setName] = useState(user?.name);
  const [editingName, setEditingName] = useState(false);
  const [image, setImage] = useState(null);

  console.log(user);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setEditingName(false);
    if (user?.name !== name) {
      saveUserName();
    }
  };

  const saveUserName = async () => {
    try {
      const updateObject = {
        _id: user?._id,
        name: name,
      };
      const updatedUser = await updateUserName(updateObject);
      dispatch({ type: "UPDATE_USER_INFO", payload: updatedUser });
      message.success("Username updated successfully.");
    } catch (error) {
      message.error("Failed to update username.");
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const saveImageToDatabase = async () => {
      try {
        const updateObject = {
          _id: user?._id,
          profileImage: image,
        };
        const updatedUser = await updateUserImage(updateObject);
        dispatch({ type: "UPDATE_USER_INFO", payload: updatedUser });
        message.success("Profile image updated successfully.");
      } catch (error) {
        message.error("Failed to update profile image.");
      }
    };
    image && saveImageToDatabase();
  }, [image]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="special_modal">
        <div className="max-w-2xl sm:max-w-sm  xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto my-16  bg-white shadow-xl rounded-lg text-gray-900  dark:bg-[#181e2f] px-3">
          <div className="mx-auto  w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden bg-white ">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-4 w-full bg-red-500 absolute z-20 h-full opacity-0 cursor-pointer"
            />{" "}
            <img
              className="object-cover object-center h-32 relative z-10"
              src={
                file
                  ? URL.createObjectURL(file)
                  : user?.profilePicture || noImage
              }
              alt="Profile"
            />
          </div>
          <div className="text-center mt-2 mx-2">
            {editingName ? (
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
            ) : (
              <>
                <h2
                  className="font-semibold"
                  onClick={() => setEditingName(true)}
                >
                  {user?.name}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
              </>
            )}
          </div>
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
