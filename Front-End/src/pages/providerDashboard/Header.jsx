import React from "react";
import { useNavigate } from "react-router-dom";

const TherapistHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-[#9C27B0] to-[#9C27B0] text-[#EEF6F9] rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={`http://localhost:5001/${user?.Picture}`}
          alt="Therapist Avatar"
          className="w-24 h-24 rounded-full border-4 border-[#EEF6F9] shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          {/* <p className="text-xl text-[#B9D9D6]">{user?.profession}</p> */}
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <button
          onClick={() => navigate("/")}
          className="bg-[#EEF6F9] text-[#9C27B0] px-6 py-2 rounded-lg font-semibold hover:bg-[#f3adff] hover:text-[#EEF6F9] transition duration-300"
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default TherapistHeader;
