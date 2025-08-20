import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    bio: "",
    jobTitle: "",
    location: "",
    skills: "",
    dob: "",
    contactNumber: "",
    workExperience: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3030/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      setUserId(res.data._id);
    };

    if (user) fetchData();
  }, [user]);

  const UpdateData = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      await axios.put(
        `http://localhost:3030/user/update/${userid}`,
        { userid, ...userdata },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white font-custom p-12">
      <div className="w-full flex justify-center text-3xl font-bold">
        Personal Information
      </div>
      <form
        onSubmit={UpdateData}
        className="h-[400px] w-full rounded-3xl flex flex-wrap gap-16 p-16"
      >
        <input
          type="text"
          name="username"
          value={userdata.username}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="fullName"
          value={userdata.fullName}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Full name"
          required
        />
        <input
          type="email"
          name="email"
          value={userdata.email}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="jobTitle"
          value={userdata.jobTitle}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Job Title"
          required
        />
        <input
          type="text"
          name="location"
          value={userdata.location}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="skills"
          value={userdata.skills}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Skills"
          required
        />
        <input
          type="date"
          name="dob"
          value={userdata.dob}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={userdata.contactNumber}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Contact number"
          required
        />
        <input
          type="text"
          name="workExperience"
          value={userdata.workExperience}
          onChange={HandleChange}
          className="px-4 py-2 w-96 bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Work Experience"
          required
        />
        <textarea
          rows="4"
          type="text"
          name="bio"
          value={userdata.bio}
          onChange={HandleChange}
          className="px-4 py-2 w-[1280px] bg-black border-2 border-zinc-500 rounded-lg"
          placeholder="Bio"
          required
        />
        <div className="mb-6 w-full flex justify-center">
          <button
            type="submit"
            className="w-96 bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
