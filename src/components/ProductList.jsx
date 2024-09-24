import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_key, base_url } from "./../utils";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Reset current page and search term when filter type changes
    setCurrentPage(1);
    setSearchTerm("");
  }, [filterType]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${base_url}/list`, {
        headers: {
          api_key: `${api_key}`,
        },
      });
      setProducts(response.data.message);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setFilterPopupVisible(false);
    setSearchTerm("");
  };

  const filteredProducts = products
    .filter((product) => {
      const productName = product.product_name?.toLowerCase() || "";
      const productID = product._id?.toString() || "";
      const originalPrice = product.original_price?.toString() || "";
      const salePrice = product.sale_price?.toString() || "";

      if (filterType === "name") {
        return productName.includes(searchTerm.toLowerCase());
      }
      if (filterType === "id") {
        return productID.includes(searchTerm);
      }
      if (filterType === "Oprice") {
        return originalPrice.includes(searchTerm);
      }
      if (filterType === "price") {
        return salePrice.includes(searchTerm);
      }
      return true;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between my-2">
        <h1 className="text-3xl font-bold text-white">All Products</h1>
        <div className="space-x-2">
          <button
            className="text-white bg-gray-600 p-2 rounded-md"
            onClick={() => setFilterPopupVisible(!filterPopupVisible)}
          >
            Filter
          </button>
          {filterPopupVisible && (
            <div className="absolute bg-gray-700 p-4 rounded-md w-32">
              <button
                className="text-white"
                onClick={() => handleFilterChange("id")}
              >
                Product ID
              </button>
              <button
                className="text-white"
                onClick={() => handleFilterChange("name")}
              >
                Name
              </button>

              <button
                className="text-white"
                onClick={() => handleFilterChange("Oprice")}
              >
                Original Price
              </button>
              <button
                className="text-white"
                onClick={() => handleFilterChange("price")}
              >
                Sale Price
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="Search"
            className="text-white bg-gray-600 p-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr className="flex justify-around items-center text-white bg-gray-700 p-2">
            <th className="bg-gray-700">SrNo</th>
            <th className="bg-gray-700">Date and Time</th>
            <th className="bg-gray-700">Product ID</th>
            <th className="bg-gray-700">Name</th>
            <th className="bg-gray-700">Original Price</th>
            <th className="bg-gray-700">Sale Price</th>
            <th className="bg-gray-700">Product Type</th>
            <th className="bg-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr
              key={product.product_id}
              className="flex justify-around items-center text-white"
            >
              <td className="text-center">{index + 1}</td>
              <td className="text-center">
                {new Date(product.date_n_time).toLocaleDateString("en-GB")}
              </td>
              <td className="text-center">{product._id}</td>
              <td className="text-center">{product.product_name}</td>
              <td className="text-center">{product.original_price}</td>
              <td className="text-center">{product.sale_price}</td>
              <td className="text-center">{product.product_type}</td>
              <td className="text-center">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-8 my-4 ">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-600 text-white p-2 rounded-sm"
        >
          Previous
        </button>

        <span className="text-white">
          Page <span className="text-red-500">{currentPage}</span> of{" "}
          {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-600 text-white p-2 rounded-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
