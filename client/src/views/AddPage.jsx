import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPage({ base_url }) {
  const navigate = useNavigate(); 
  const [food, setFood] = useState({
    name: "",
    description: "",
    ingredients: "",
    imgUrl: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(
        `${base_url}/foods`,
        { ...food },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
    //   alert("New menu item added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to add menu item:", error);
      alert("Failed to add menu item. Please try again.");
    }
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Menu</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={food.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={food.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-medium"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={food.ingredients}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="imgUrl" className="block text-gray-700 font-medium">
              Image URL
            </label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              value={food.imgUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="block text-gray-700 font-medium">
              CategoryId
            </label>
            <input
              type="text"
              id="categoryId"
              name="categoryId"
              value={food.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              userId
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={food.userId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Add Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
