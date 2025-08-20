import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Heart } from "lucide-react";
import { MessageCircle } from 'lucide-react';
import { Send } from 'lucide-react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/user/getPost/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-2 min-h-screen text-white w-full bg-black flex p-10">
      <div className="h-full w-1/2">
        <div className="relative p-10 flex justify-center items-center">
          <img
            src={post.url}
            alt="Post"
            className="rounded-3xl object-cover transition-transform duration-300 max-w-[80%] max-h-[80%]"
          />
        </div>
      </div>
      <div className="h-full w-1/2 flex flex-col gap-6 mt-16">
        <div className="flex items-center justify-between w-[70vh] gap-2">
          <Link to={`/userprofile/${post.user._id}`} className="flex items-end gap-2">
            <img
              src={post.user.profilePicture?.url || defaultProfile}
              className="h-12 w-12 rounded-full"
            />
            <span className="text-lg font-semibold text-white">
              {post.user.username || "Unknown"}
            </span>
          </Link>
        </div>
        <div className=" w-[70vh] font-semibold text-gray-300">{post.bio}</div>
        <hr className="w-[70vh] border-zinc-800"></hr>
        <div className="flex flex-wrap gap-3">
          {post.tags && post.tags.length > 0 ? (
            post.tags.map((tag, index) => (
              <p
                key={index}
                className="font-semibold text-white text-sm px-3 py-1 bg-zinc-800 rounded-2xl flex justify-center items-center"
              >
                #{tag}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No tags available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
