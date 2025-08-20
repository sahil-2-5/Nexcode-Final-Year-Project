import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("adminDashboard");
  const [selectedProfession, setSelectedProfession] = useState("All");
  const defaultProfile = "https://via.placeholder.com/100";

  const [iconUrl, setIcon] = useState("");
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [visitLink, setVisitLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get("http://localhost:3030/user/users");
        setUsers(user.data);
        setFilteredUsers(user.data);
      } catch (e) {
        console.log("Error fetching users:", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProfession === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.jobTitle &&
            user.jobTitle.toLowerCase().includes(selectedProfession.toLowerCase())
        )
      );
    }
  }, [selectedProfession, users]);

  const HandleAiTool = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/admin/addNewAiTool", {
        iconUrl,
        toolName,
        category,
        description,
        visitLink,
      });
      alert("✅ AI Tool added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("🚨 Error adding AI Tool:", error);
      if (error.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Failed to add AI Tool. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen py-5 w-full bg-black flex font-custom">
      <div className="w-64 bg-black border-r-2 border-zinc-800 p-5 fixed h-screen">
        <h1 className="text-2xl font-bold text-white mb-10">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("adminDashboard")}
              className={`w-full text-left p-3 rounded-lg ${
                activeTab === "adminDashboard"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              Admin Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("aiHub")}
              className={`w-full text-left p-3 rounded-lg ${
                activeTab === "aiHub"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              AI Hub
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-10 text-white ml-64">
        {activeTab === "adminDashboard" ? (
          <>
            <div className="w-full h-20 mb-4">
              <h1 className="text-3xl font-bold">Users</h1>
              <p className="text-zinc-500">
                Manage your users and their information.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Filter by Profession
              </label>
              <select
                className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Java Developer">Java Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Tester">Tester</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Software Tester">Software Tester</option>
                <option value="Cloud Architect">Cloud Architect</option>
                <option value="Mobile App Developer">Mobile App Developer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Database Administrator">Database Administrator</option>
                <option value="Web Developer">Web Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
            </div>

            <div className="py-5 w-full flex flex-wrap gap-6 justify-center">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-zinc-900 p-5 rounded-2xl border border-zinc-700 shadow-lg flex flex-col items-center text-center w-64"
                  >
                    <img
                      src={user.profilePicture?.url || defaultProfile}
                      alt="User Avatar"
                      className="h-20 w-20 rounded-full border-2 border-zinc-700"
                    />
                    <h2 className="mt-3 text-md">@{user.username}</h2>
                    <p className="text-gray-500">
                      {user.jobTitle || "Not Mentioned"}
                    </p>
                    <Link
                      to={`/userprofile/${user._id}`}
                      className="mt-4 bg-blue-600 text-white px-3 py-2 text-xs rounded-lg hover:bg-blue-700"
                    >
                      Visit Profile
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center w-full">
                  No users found for selected profession.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-20">
            <h1 className="text-3xl font-bold">AI Hub</h1>
            <p className="text-zinc-500">Add New AI Tool</p>
            <div className="w-full max-w-2xl mx-auto">
              <form className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Icon URL
                  </label>
                  <input
                    type="text"
                    placeholder="Enter icon URL"
                    className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) => setIcon(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tool name"
                    className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) => setToolName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    <option value="Image Generators">Image Generators</option>
                    <option value="Writing & Web SEO">Writing & Web SEO</option>
                    <option value="AI chat & Assistant">AI chat & Assistant</option>
                    <option value="Video Generators">Video Generators</option>
                    <option value="Text To Speech">Text To Speech</option>
                    <option value="Education / Studies">Education / Studies</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="AI Detection">AI Detection</option>
                    <option value="E-mail">E-mail</option>
                    <option value="Logo Creation">Logo Creation</option>
                    <option value="Websites & Design">Websites & Design</option>
                    <option value="Image Editing">Image Editing</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Developer Tools">Developer Tools</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    rows="4"
                    className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Visit Link
                  </label>
                  <input
                    type="text"
                    placeholder="Enter visit link"
                    className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    onChange={(e) => setVisitLink(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={HandleAiTool}
                >
                  Add AI Tool
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
