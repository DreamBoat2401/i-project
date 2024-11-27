import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPage({ base_url }) {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchFoodDetail() {
      try {
        const { data } = await axios.get(`${base_url}/foods/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`
          }
        });
        setFood(data.foods);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchFoodDetail();
  }, [id, base_url]);

  // delete
  async function handleDelete() {
    // if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await axios.delete(`${base_url}/foods/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`
          }
        });
        // alert("Food item deleted successfully.");
        navigate("/"); 
      } catch (error) {
        console.error("Error deleting food item:", error);
        alert("Failed to delete the food item.");
      }
    // }
  }

  // update
  function handleUpdate() {
    navigate(`/foods/${id}/edit`);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!food) {
    return <p>Food not found.</p>;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={food.imgUrl} alt={food.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{food.name}</h1>
          <p className="text-gray-600 mt-4">{food.description}</p>
          <p className="text-red-600 font-bold text-2xl mt-6">Ingredients:</p>
          <p className="text-gray-600 mt-4">{food.ingredients}</p>

          {/* Button */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleUpdate}
              className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
