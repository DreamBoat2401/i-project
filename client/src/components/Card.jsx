

export default function Card({ food }) {
    

    return(
        <>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={food.imgUrl}
          alt="Dish"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-800">
            {food.name}
          </h4>
          <p className="text-gray-600 mt-2">{food.desxription}</p>
          <p className="text-red-600 font-bold mt-4">$12.99</p>
        </div>
      </div>
        </>
    )
}