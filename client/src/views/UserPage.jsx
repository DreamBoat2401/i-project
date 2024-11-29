import axios from "axios";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function UserPage({ base_url }) {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  async function fetchProfile() {
    try {
      setError(null);
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Access token is missing!");
  
      const { data } = await axios.get(`${base_url}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data);
    } catch (err) {
      console.error(err);
      // Periksa status error dan tampilkan pesan sesuai
      if (err.response && err.response.status === 404) {
        setError("User not found.");
      } else {
        setError("Failed to fetch profile.");
      }
    }
  }
  

  async function handleUpload(file) {
    try {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Access token is missing!");

      await axios.patch(`${base_url}/profile/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProfile();
    } catch (err) {
      console.error(err);
      setError("Failed to upload the image.");
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-900 text-gray-200 min-h-screen">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="relative mb-4">
            <img
              src={profile.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-green-500"
            />
            <label
              className="absolute bottom-0 right-0 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
              title="Upload"
            >
              <input
                type="file"
                onChange={(e) => handleUpload(e.target.files[0])}
                className="hidden"
              />
              <FaUpload />
            </label>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">
            {profile.email || "No email available"}
          </h2>
          <p className="text-gray-300 text-center mb-4">
            Welcome to your profile!
          </p>
        </div>
      )}
    </div>
  );
}
