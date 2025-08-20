import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AddNewSnippet = () => {
  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3030/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data._id);
    };
    if (user) fetchData();
  }, [user]);

  const HandleCodeSnip = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3030/user/addCodeSnippet", {
        userid : userid,
        code,
        description,
        language,
      });
      alert("Code snippet added successfully!");
      navigate('/codesnippet');
    } catch (error) {
      console.error(
        "Error adding snippet:",
        error.response?.data || error.message
      );
      alert("Failed to add code snippet.");
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950 text-white p-10">
      <Link to="/codesnippet" className="HomeIcon">
        <MdOutlineArrowBackIos color="white" size={25} />
      </Link>
      <form className="p-6 rounded-lg shadow-lg w-full" onSubmit={HandleCodeSnip}>
        <h1 className="text-3xl font-bold mb-4 text-white">Submit Your Code</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Provide your code snippet along with a brief description.
        </p>

        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-white mb-2">
            Code
          </label>
          <textarea
            id="code"
            required
            rows="6"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            className="input"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Briefly describe your code..."
            className="input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-white mb-2">
            Programming Language
          </label>
          <select
            id="language"
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="input"
          >
            <option value="">Select a language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="Go">Go</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="mt-4 justify-center w-full flex">
          <button
            type="submit"
            className="w-1/4 bg-zinc-300 text-zinc-950 px-4 py-2 rounded-lg font-semibold"
          >
            Submit Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSnippet;
