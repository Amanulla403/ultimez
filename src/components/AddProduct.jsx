import React, { useState } from "react";
import axios from "axios";
import { api_key, base_url } from "../utils";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/add_new`, formData, {
        headers: {
          api_key: `${api_key}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Reset form
      setFormData({
        product_name: "",
        original_price: "",
        sale_price: "",
        product_type: "",
        description: "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 py-8">
      <h1 className="text-3xl font-bold text-white ">Create New Product</h1>
      <form
        onSubmit={submitForm}
        className="flex flex-col justify-center items-center gap-8 bg-gray-900 w-1/4 p-6 rounded-xl"
      >
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="number"
          name="original_price"
          placeholder="Original Price"
          value={formData.original_price}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="number"
          name="sale_price"
          placeholder="Sale Price"
          value={formData.sale_price}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="number"
          name="product_type"
          placeholder="Product Type"
          value={formData.product_type}
          onChange={handleInputChange}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-input"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded-xl"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
