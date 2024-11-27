import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage({ base_url }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    
    async function handleOnSubmit(e) {
        try {
            e.preventDefault()
            // console.log(email, password);
            const { data } = await axios.post(`${base_url}/login`, {
                email, 
                password
            })
            // console.log(data.access_token);
            localStorage.setItem("access_token", data.access_token)

            navigate('/')
        } catch (error) {
            console.log(error);
            
        }
    }
    

    return(
        <>
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
      Login
    </h2>
    <form onSubmit={handleOnSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </form>
    <div className="mt-5 flex items-center justify-center">
    <Link to="/register">Don't have account? Register here</Link>
    </div>
  </div>
        </div>
</>
        </>
    )
}