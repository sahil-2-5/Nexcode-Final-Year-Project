import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../context/AuthContext";

const AskQuestion = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // State for description
  const [tags, setTags] = useState("");

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

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  const HandleUserQuestion = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3030/user/addQuestion", {
        title,
        description,
        tags,
        data: userid,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/nexcodeoverflow-data");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <header className="absolute p-2 ml-6 justify-between items-center "></header>
      <div className="h-screen w-full p-20 bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold mb-6 font-custom">Ask a Question</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium font-custom">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              placeholder="What's your programming question? Be specific."
              className="input mt-4"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm mb-5 text-white font-medium font-custom"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              required
              placeholder="Provide details and any code you've tried..."
              style={{
                height: "200px",
                marginBottom: "10px",
                color: "white", // Make text white
              }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["code-block"],
                  ["link"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "blockquote",
                "list",
                "bullet",
                "code-block",
                "link",
              ]}
            />
          </div>

          <div>
            <label htmlFor="tags" className="block mt-16 text-sm font-medium font-custom">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              placeholder="Add up to 5 tags (comma-separated)"
              className="input mt-4"
              required
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={HandleUserQuestion}
              className="button"
            >
              Post Your Question
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AskQuestion;
