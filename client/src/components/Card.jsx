import { useNavigate } from "react-router-dom"


export default function Card({ food }) {
    const navigate =  useNavigate()

    function handleOnClick() {
        navigate(`foods/${food.id}`)
    }
    

    return(
        <>
        <div className="bg-white shadow-md rounded-lg overflow-hidden" onClick={handleOnClick}>
        <img
          src={food.imgUrl}
          alt="Dish"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-800">
            {food.name}
          </h4>
          <p className="text-gray-600 mt-2">{food.description}</p>
          <p className="text-red-600 font-bold mt-4">See more...</p>
        </div>
      </div>
        </>
    )
}