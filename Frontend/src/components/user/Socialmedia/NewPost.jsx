import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [user, setUser] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [hashtags, setHashtags] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOneUser = async () => {
      try {
        const response = await axios.get("http://localhost:3030/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
      }
    };
    fetchOneUser();
  }, []);

  const fileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview(e.target.result);
      };
      fileReader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    setBio("");
    setHashtags("");
  };

  const handlePost = async () => {
    if (!file || !user) {
      alert("Please select an image and enter details.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("bio", bio);
    formData.append("hashtags", hashtags);
    formData.append("userId", user._id); 

    try {
      const response = await axios.post(
        "http://localhost:3030/user/uploadNewPost",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("Post uploaded successfully!");
        navigate(`/nexgram/${user._id}`);
        handleRemove();
      } else {
        alert("Failed to upload post.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div className="h-screen w-full bg-black p-20">
        <div className="text-6xl text-white -mt-10 w-full text-center font-bold">New Post</div>
      <div className="w-full h-full bg-zinc-900 rounded-2xl text-white shadow-lg mt-5 flex">
 
        <div className="relative w-1/2 h-full border-r border-gray-700 flex items-center justify-center">
          {!preview ? (
            <label className="w-full h-full flex items-center justify-center text-gray-400 text-sm cursor-pointer">
              Select Image
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={fileChange}
              />
            </label>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-l-2xl"
            />
          )}
        </div>

   
        <div className="w-1/2 p-4 flex flex-col justify-start">

          <div className="flex justify-end">
            <button
              className={`px-4 py-1 rounded-lg font-semibold ${
                file
                  ? "bg-violet-600 text-white"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!file}
              onClick={handlePost}
            >
              POST
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <textarea
              type="text"
              rows={10}
              placeholder="Add bio"
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hashtags"
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg outline-none"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
            {file && (
              <button
                onClick={handleRemove}
                className="absolute bottom-24 text-sm text-red-500 "
              >
                Remove Post
              </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
