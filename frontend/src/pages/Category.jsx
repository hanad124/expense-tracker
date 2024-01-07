import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table, message } from "antd";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../src/apicalls/categories";
import AddEditTransactionModal from "../components/AddEditTransactionModal";
import AddEditCategory from "../components/AddEditCategory";
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

  // fetch categories
  const fetchCategories = async () => {
    // message.loading("Fetching all categories...", 0.5);
    try {
      const response = await getCategories();

      if (response.success) {
        setTimeout(() => {
          setCategories(response.data);
          message.success(response.message);
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

  return (
    <DefaultLayout>
      <div className="border rounded-md">
        <button
          className="btn bg-primary text-white w-full md:w-auto h-full"
          onClick={() => setShowAddCategoryModel(true)}
        >
          Add Category
        </button>
        {showAddCategoryModal && (
          <AddEditCategory
            showAddCategoryModal={showAddCategoryModal}
            setShowAddCategoryModel={setShowAddCategoryModel}
            getCategoriesData={fetchCategories}
            showEditCategoryObject={showEditCategoryObject}
            setShowEditCategoryObject={setShowEditCategoryObject}
          />
        )}
        <Table dataSource={categories} columns={columns} />
      </div>
    </DefaultLayout>
  );
};

export default Category;
