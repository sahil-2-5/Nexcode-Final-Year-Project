import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import defaultProfile from "/Usericons/defaultPicture.jpg";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/user/profile/${id}`
        );
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 border-b border-zinc-800 pb-10">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-violet-600 shadow-lg">
          <img
            src={user?.profilePicture?.url || defaultProfile}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-gray-400 text-sm">@{user.username}</p>
            <p className="mt-3 max-w-xl text-gray-300 text-sm">{user.bio}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-gray-400 text-sm">
              <p className="flex items-center gap-1">
                <IoLocationOutline className="text-lg" />
                {user.location || "Unknown"}
              </p>
              <p className="flex items-center gap-1">
                <LiaBirthdayCakeSolid className="text-lg" />
                {user.dob || "N/A"}
              </p>
              <p className="flex items-center gap-1">
                <HiOutlineMail className="text-lg" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:ml-auto text-center">
            <p className="text-2xl font-bold">
              {user.sharedPosts?.length || 0}
            </p>
            <span className="text-gray-400">Posts</span>
          </div>
        </div>
      </div>

      {/* Skills & Role */}
      <div className="mt-10">
        <p className="text-xl font-semibold mb-3">Skills</p>
        <div className="flex flex-wrap gap-3">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-zinc-800 text-sm px-4 py-1 rounded-full text-gray-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No skills added</p>
          )}
        </div>

        <p className="mt-4 text-sm">
          <span className="font-semibold">Current Role:</span>{" "}
          {user.jobTitle || "Not mentioned"}
        </p>
      </div>

      {/* Post Gallery */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Shared Posts</h2>
        {user.sharedPosts && user.sharedPosts.length > 0 ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {user.sharedPosts.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="break-inside-avoid overflow-hidden rounded-lg group relative hover:shadow-xl transition-shadow"
              >
                <img
                  src={post.url}
                  alt="Post"
                  className="w-full h-auto rounded-lg object-cover group-hover:opacity-90 transition duration-300"
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
