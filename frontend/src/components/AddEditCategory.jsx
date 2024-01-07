import React from "react";
import { Form, Input, Modal, Select, message } from "antd";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
import {
  getCategories,
  addCategory,
  editCategory,
} from "../apicalls/categories";

const AddEditCategory = (props) => {
  const {
    showAddCategoryModal,
    setShowAddCategoryModel,
    getCategoriesData,
    showEditCategoryObject,
    setShowEditCategoryObject,
  } = props;

  const onFinish = async (values) => {
    if (showEditCategoryObject) {
      // edit category
      const catecUpdateObject = {
        _id: showEditCategoryObject._id,
        user: showEditCategoryObject.user,
        name: values.name,
        description: values.description,
      };
      message.loading("Updating category...", 0.5);
      try {
        const response = await editCategory(
          // showEditCategoryObject._id,
          catecUpdateObject
        );
        console.log(response);
        if (response.success) {
          setTimeout(() => {
            message.success(response.message);
            setShowEditCategoryObject(null);
            setShowAddCategoryModel(false);
            getCategoriesData();
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
    } else {
      // add category
      message.loading("Adding new category...", 0.5);
      try {
        const response = await addCategory({
          name: values.name,
          description: values.description,
        });
        if (response.success) {
          setTimeout(() => {
            message.success(response.message);
            setShowAddCategoryModel(false);
            getCategoriesData();
          }, 500);
        }
      } catch (error) {
        setTimeout(() => {
          message.error(error.message);
        }, 500);
      }
    }
    setShowEditCategoryObject(null);
    setShowAddCategoryModel(false);
  };

  return (
    <div>
      <Modal
        title={showEditCategoryObject ? "Edit Category" : "Add New Category"}
        description="Make changes to your category here. Click save when you're done."
        visible={showAddCategoryModal}
        onCancel={() => {
          setShowEditCategoryObject(null);
          setShowAddCategoryModel(false);
        }}
        footer={null}
      >
        <p className="text-gray-500">
          Make changes to your category here. Click{" "}
          {showEditCategoryObject ? "Update" : "Add"} category <br />
          when you're done.
        </p>
        <Form
          name="basic"
          initialValues={{
            name: showEditCategoryObject ? showEditCategoryObject.name : "",
            description: showEditCategoryObject
              ? showEditCategoryObject.description
              : "",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
            className=""
          >
            <Input className="ml-1 w-auto min-w-72" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input category description!",
              },
            ]}
          >
            <Input className="ml-7 w-auto min-w-72" />
          </Form.Item>

          <Form.Item className="flex justify-end mr-14">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              {showEditCategoryObject ? "Update Category" : "Add Category"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEditCategory;
