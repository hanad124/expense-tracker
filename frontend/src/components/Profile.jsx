import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

import { message } from "antd";
import {
  updateUserName,
  updateUserImage,
  getUserInfo,
} from "../apicalls/users";
import {
  getAllTransactionsOfUser,
  getAllTransactions,
} from "../apicalls/transactions";
import numberFormat from "../providers/numbFormatter";

import noImage from "../assets/no-image.jpeg";

function Profile(props) {
  const { show, setShow, handleClose, handleShow } = props;
  const [file, setFile] = useState("");
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const [name, setName] = useState(user?.name);
  const [editingName, setEditingName] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

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
      dispatch(getUserDetails(updatedUser.data));
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
              setLoading(true);
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
          setLoading(false);
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
        dispatch(getUserDetails(updatedUser.data));

        handleClose();
      } catch (error) {
        message.error("Failed to update profile image.");
      }
    };
    image && saveImageToDatabase();
  }, [image]);

  const getIncome = async () => {
    try {
      const data = await getAllTransactions();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const income = data.data.reduce((totalIncome, transaction) => {
        if (transaction.type === "income") {
          return totalIncome + transaction.amount;
        }
        return totalIncome;
      }, 0);

      setIncome(income);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const getExpense = async () => {
    try {
      const data = await getAllTransactions();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const expense = data.data.reduce((totalExpense, transaction) => {
        if (transaction.type === "expense") {
          return totalExpense + transaction.amount;
        }
        return totalExpense;
      }, 0);

      setExpense(expense);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={loading ? null : handleClose}
        className="special_modal"
      >
        <div className="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-white bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none rounded-md">
          <div
            className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
            style={{
              backgroundImage: "url(https://i.ibb.co/FWggPq1/banner.png)",
            }}
          >
            <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full overflow-hidden border-[4px] border-white bg-pink-400">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="py-20 w-full absolute z-20 h-full top-0 opacity-0 cursor-pointer"
              />{" "}
              <img
                className="h-32 object-cover object-center w-full relative z-10 "
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user?.profilePicture || noImage
                }
                alt=""
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center">
            {editingName ? (
              <>
                {" "}
                <input
                  type="text"
                  className="text-slate-700 text-xl font-bold bg-transparent border-non focus:outline-none focus:ring-0 focus:border-transparent"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                />
                <p className="text-gray-500">{user?.email}</p>
              </>
            ) : (
              <>
                <h4
                  className="text-slate-700 text-xl font-bold"
                  onClick={() => setEditingName(true)}
                >
                  {user?.name}
                </h4>
                <p className="text-gray-500">{user?.email}</p>
              </>
            )}
          </div>
          <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-slate-700 text-2xl font-bold">
                ${numberFormat(income)}
              </h3>
              <p className="text-slate-500 text-sm font-normal">Income</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-slate-700 text-2xl font-bold">
                ${numberFormat(expense)}
              </h3>
              <p className="text-slate-500 text-sm font-normal">Expense</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-slate-700 text-2xl font-bold">
                $
                {income > expense
                  ? numberFormat(income - expense)
                  : numberFormat(expense - income)}
              </h3>
              <p className="text-slate-500 text-sm font-normal">Balance</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
