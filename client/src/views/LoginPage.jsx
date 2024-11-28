import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';


export default function LoginPage({ base_url }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }

    async function googleLogin(codeResponse) {
      try {
        // console.log(codeResponse);
        const { data } = await axios.post(`${base_url}/google-login`, null, {
          headers: {
            token: codeResponse.credential
          }
        })
        console.log(data, "<<<ini data");
        
        localStorage.setItem("access_token", data.access_token)
        navigate('/')
      } catch (error) {
        
      }
    }
    
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
    
    useEffect(() => {
      // google.accounts.id.initialize({
      //   client_id: "543833896847-4dmk1nsda2sr35pk6qa95hn947a62pcv.apps.googleusercontent.com",
      //   callback: handleCredentialResponse
      // });
      // google.accounts.id.renderButton(
      //   document.getElementById("buttonDiv"),
      //   { theme: "outline", size: "large" }  // customization attributes
      // );
    }, [])

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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Login
        </button>
      </div>
      <br />
      <div id="buttonDiv" className="flex items-center justify-center">
        <GoogleLogin onSuccess={googleLogin}/>
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