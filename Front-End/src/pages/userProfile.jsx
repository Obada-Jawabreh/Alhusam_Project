import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, User, Mail, FileText } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/user";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userprofile`, {
          withCredentials: true,
        });
        const data = response.data;
        setUser(data);
        setFormData({
          username: data.username,
          email: data.email,
          bio: data.bio || "",
          profilePicture: data.profilePicture || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Add error toast or notification
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (formData.bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear specific error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const response = await axios.put(`${API_BASE_URL}/userprofile`, formData, {
        withCredentials: true,
      });
      const updatedUser = response.data;
      setUser(updatedUser);
      setIsEditing(false);
      // Replace alert with a toast notification in a real app
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Add error toast or notification
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        <div className="p-8 relative">
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Profile</h1>
          
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="relative group">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover shadow-lg group-hover:opacity-75 transition-opacity"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={48} />
                </div>
              )}
              
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer">
                    <Upload size={24} color="white" />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            {!isEditing && (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            )}
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="mr-2 text-blue-600" /> Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.username 
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="mr-2 text-blue-600" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} className="mr-2 text-blue-600" /> Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.bio
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}