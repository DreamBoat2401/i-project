import axios from "axios";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/food/foodSlice";


export default function HomePage({ base_url }) {
    // const [foods, setFoods] = useState([])
    // console.log(foods);

    const { foods, loading, error } = useSelector((state) => state.foods);
    const dispatch = useDispatch();

    console.log(foods.foods);
    

    // async function fetchFoods() {
    //     try {
    //         const { data } = await axios.get(`${base_url}/foods`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.access_token}`
    //             }
    //         })
    //         console.log(data.foods);
    //         setFoods(data.foods)
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        dispatch(fetchAsync())
    }, [])

    return(
        <>
  <title>Delicious Bites</title>
  {/* Hero Section */}
  <section
    className="bg-cover bg-center h-[80vh]"
    style={{
      backgroundImage:
        'url("https://www.healthifyme.com/blog/wp-content/uploads/2022/12/HDL-Cholesterol-Rich-Foods-to-Raise-Your-Good-Cholesterol-1024x582.jpg")'
    }}
  >
    <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
      <div className="text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Taste the Best</h2>
        <p className="text-lg md:text-xl mb-6">
          Discover our delicious, freshly made dishes.
        </p>
        <a
          href="#menu"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold"
        >
          Explore Menu
        </a>
      </div>
    </div>
  </section>
  {/* Featured Menu Section */}
  <section id="menu" className="container mx-auto py-12 px-6">
    <h3 className="text-3xl font-bold text-center mb-8 text-gray-700">
      Featured Dishes
    </h3>
    <div className="grid gap-8 md:grid-cols-3">
      {/* Card */}
      {foods?.map((food) => (
        <Card 
            key={food?.id}
            food={food}
            fetchAsync={fetchAsync}
        />
      ))}
    </div>
  </section>
  {/* Footer */}
  <footer className="bg-gray-800 text-gray-200 py-6">
    <div className="container mx-auto text-center">
      <p>© 2024 Delicious Bites. All Rights Reserved.</p>
    </div>
  </footer>
</>

    )
}