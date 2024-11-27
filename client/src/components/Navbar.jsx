import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate()

    async function handleLogout(e) {
        try {
            e.preventDefault()
            localStorage.clear()

            navigate('/login')
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <>
        <header className="bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to='/'>
      <h1 className="text-2xl font-bold text-red-600">Delicious Bites</h1>
        </Link>
      <nav>
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <a href="#" className="hover:text-red-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-600">
              Menu
            </a>
          </li>
          <li>
            <Link to="/foods/add" className="hover:text-red-600">
              Add Menu
            </Link>
          </li>
          <li>
            <a className="hover:text-red-600" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
        </>
    )
}