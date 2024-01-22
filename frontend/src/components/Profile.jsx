import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { updateUserName } from "../apicalls/users";

function Profile(props) {
  const { show, setShow, handleClose, handleShow } = props;
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const [name, setName] = useState(user.name);
  const [editingName, setEditingName] = useState(false); // Track if username is being edited

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setEditingName(false);
    if (user.name !== name) {
      saveUserName();
    }
  };

  const saveUserName = async () => {
    try {
      const updateObject = {
        _id: user._id,
        name: name,
      };
      const updatedUser = await updateUserName(updateObject);
      dispatch({ type: "UPDATE_USER_INFO", payload: updatedUser });
      message.success("Username updated successfully.");
    } catch (error) {
      message.error("Failed to update username.");
    }
  };

  return (
    <>
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
                  {user.name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
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
