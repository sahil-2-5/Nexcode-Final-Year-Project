import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EditProfilePicture = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");

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
  };

  const handleUpload = async () => {
    if (!file || !userid) {
      alert("Please select a file and ensure user ID is available.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userid);

    try {
      const response = await axios.post(
        "http://localhost:3030/user/setProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Image uploaded successfully!");
        navigate("/dashboard");
        setPreview(null);
        setFile(null);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-white bg-black rounded-2xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Upload Image</h1>

          <div className="relative border-dashed border-2 border-gray-500 rounded-full overflow-hidden h-80 w-80 flex items-center justify-center">
            {!preview ? (
              <span className="text-gray-500 text-center">
                Drag and drop your image here or
                <br></br>
                <span className="text-indigo-500 font-semibold cursor-pointer">
                  click to upload
                </span>
              </span>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={preview}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <input
              onChange={fileChange}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {preview && (
            <div
              className="mt-4 flex justify-center"
              onClick={handleRemove}
              style={{
                cursor: "pointer",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "4px 10px",
                borderRadius: "5px",
              }}
            >
              <span className="text-red-500 font-bold text-sm">Remove</span>
            </div>
          )}

          <button
            className={`w-full mt-4 py-2 px-4 text-black font-semibold rounded-lg ${
              file ? "bg-violet-600" : "bg-white cursor-not-allowed"
            }`}
            disabled={!file}
            onClick={handleUpload}
          >
            set profile
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfilePicture;
