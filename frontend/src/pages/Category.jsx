import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table, message } from "antd";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../src/apicalls/categories";
import { FiSearch, FiPlus } from "react-icons/fi";
import AddEditCategory from "../components/AddEditCategory";
// import { useQueryState } from "next-usequerystate";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModel] = useState(false);
  const [showEditCategoryObject, setShowEditCategoryObject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch categories
  const fetchCategories = async () => {
    // message.loading("Fetching all categories...", 0.5);
    try {
      const response = await getCategories();

      if (response.success) {
        setTimeout(() => {
          setCategories(response.data);
          // message.success(response.message);
        }, 500);
      } else {
        setTimeout(() => {
          message.error(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirmation = async (payload) => {
    setIsOpen(false);
    message.loading("Deleting category...", 0.5);
    try {
      const response = await deleteCategory(payload);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          fetchCategories();
        }, 500);
      } else {
        setTimeout(() => {
          message.error(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    // description
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <EditOutlined
              onClick={() => {
                console.log(record);
                setShowEditCategoryObject(record);
                setShowAddCategoryModel(true);
              }}
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <DeleteOutlined
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation!</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this Category?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteConfirmation(record)}
                    className="-mb-1"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  // filter categories
  const filteredCategories = categories?.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <h1 className="text-slate-700 mb-5 text-3xl font-bold">Categories</h1>
        <button
          className="  bg-primary text-white h-full w-auto flex items-center gap-2 px-3 py-2 rounded-md"
          onClick={() => setShowAddCategoryModel(true)}
        >
          <div>
            <FiPlus className="" />
          </div>
          <span> Add Category</span>
        </button>
      </div>
      <div className="border rounded-md bg-white">
        <div className="flex items-center gap-10 m-2">
          <div
            className="flex items-center border rounded-md bg-white flex-1  focus-within:border-blue-500
          focus-within:border-2"
          >
            <FiSearch className="mx-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories"
              className=" py-2 px-2 outline-none bg-none border-none rounded-md focus:border-blue-500 w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {showAddCategoryModal && (
          <AddEditCategory
            showAddCategoryModal={showAddCategoryModal}
            setShowAddCategoryModel={setShowAddCategoryModel}
            getCategoriesData={fetchCategories}
            showEditCategoryObject={showEditCategoryObject}
            setShowEditCategoryObject={setShowEditCategoryObject}
          />
        )}
        <Table dataSource={filteredCategories} columns={columns} />
      </div>
    </DefaultLayout>
  );
};

export default Category;
