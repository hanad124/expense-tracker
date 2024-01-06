import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table, message } from "antd";
import { addCategory, getCategories } from "../../src/apicalls/categories";

const Category = () => {
  const [categories, setCategories] = useState([]);

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

  console.log(categories);
  return <DefaultLayout>Category</DefaultLayout>;
};

export default Category;
