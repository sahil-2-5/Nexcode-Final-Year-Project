import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import defaultProfile from "/Usericons/defaultPicture.jpg";

const NexGram = () => {
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3030/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error(
          "Error fetching user data:",
          err.response?.data || err.message
        );
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/user/getAllPost"
        );
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-white text-center py-10">Loading posts...</p>;
  if (error)
    return <p className="text-red-500 text-center py-10">Error: {error}</p>;

  return (
    <div className="py-2 w-full bg-black text-white scrollbar-hide">
      <div className="top p-10 w-full gap-5 h-10 flex justify-between items-center relative">
        {/* Left - Back Button */}
        <Link to="/dashboard" className="HomeIcon">
          <MdOutlineArrowBackIos color="white" size={25} />
        </Link>

        {/* Center - Title */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[2px_2px_0px_#7C3AED] absolute left-1/2 transform -translate-x-1/2">
          NexGram
        </h1>

        {/* Right - Profile Menu */}
        <div className="flex items-center gap-4">
          <div
            className="h-10 w-10 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img
              src={user.profilePicture?.url || defaultProfile}
              className="h-10 w-10 rounded-full"
            />
          </div>

          {menuOpen && (
            <div className="absolute top-20 right-10 w-32 bg-zinc-900 text-white shadow-lg z-10 rounded-lg p-2">
              <Link
                to={`/userprofile/${user._id}`}
                className="block text-right px-4 py-2 hover:bg-zinc-800 rounded"
              >
                Profile
              </Link>
              <Link
                to={`/newpost/${user._id}`}
                className="block text-right px-4 py-2 hover:bg-zinc-800 rounded"
              >
                Post
              </Link>
              <Link
                to="/dashboard"
                className="block text-right px-4 py-2 hover:bg-zinc-800 rounded"
              >
                Exit
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Masonry Layout */}
      <div className="p-8 w-full">
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 space-y-5">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">No posts available</p>
          ) : (
            posts.map((post) => {
              return (
                <Link
                  to={`/post/${post._id}`}
                  key={post._id}
                  className="break-inside-avoid rounded-xl overflow-hidden relative group"
                >
                  <img
                    src={post.url}
                    alt="Post"
                    className="w-full rounded-lg object-cover mt-5"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                  <div className="absolute bottom-2 left-4 flex items-center space-x-2 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={post.user.profilePicture?.url || defaultProfile}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="text-sm font-semibold text-white">
                      {post.user.username || "Unknown"}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NexGram;
