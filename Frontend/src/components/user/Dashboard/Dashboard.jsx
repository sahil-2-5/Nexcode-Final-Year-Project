import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../../../App.css";

import { MdOutlineArrowBackIos } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import Earth from "/Background/video/Earth.mp4";

import defaultProfile from "/Usericons/defaultPicture.jpg";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [bgText, setBgText] = useState("");

  const triangles = [
    { path: "/aiprompt", text: "AI Prompt" },
    { path: "/dailynewsupdate", text: "Daily News" },
    { path: "/nexcodeoverflow-data", text: "NexOver" },
    { path: "/codesnippet", text: "Code Snippet" },
    { path: "/taskmanager", text: "Task Manager" },
    { path: `/nexgram/${user._id}`, text: "NexGram" },
    { path: "/aihub", text: "AI Hub" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const [oneuser, alluser] = await Promise.all([
        axios.get("http://localhost:3030/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/user/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setData(oneuser.data);
      setUsers(alluser.data);
    };

    if (user) fetchData();
  }, [user]);

  //if (!user) return <div>Please log in to view your data.</div>;

  return (
    <>
      <div className="scrollbar-hide h-full w-full bg-gray-200 overflow-scroll">
        <div className="relative w-full h-screen ">
          <div className="h-screen w-full gap-10 relative items-center justify-center textColor">
            <header className="flex fixed justify-between p-2 mt-2 items-center w-full">
              <Link to="/" className="HomeIcon ml-1 p-5">
                <MdOutlineArrowBackIos color="black" size={25} />
              </Link>
            </header>

            <div className="h-full w-full p-16 gap-10 flex">
              <div className="h-full w-[64vw] rounded-3xl flex flex-col overflow-hidden">
                <div className="h-1/2 w-full">
                  <video
                    autoPlay
                    loop
                    muted
                    className="top-0 left-0 w-full h-full object-cover"
                  >
                    <source src={Earth} type="video/mp4" />
                  </video>
                </div>
                <div className="flex">
                  <img
                    src={data?.profilePicture?.url || defaultProfile}
                    alt="profile"
                    className="profile border-8 border-black flex justify-end items-end absolute -mt-32 ml-8 h-52 w-52 rounded-full"
                  />
                  <Link
                    to="/editprofilepicture"
                    className="bg-black p-2 border-4 border-black ml-44 mt-8 absolute rounded-full"
                  >
                    <LiaUserEditSolid size={20} color="white" />
                  </Link>
                </div>

                <div className="userdata h-1/2 w-full flex bg-black  ">
                  <div className="h-full w-1/2 flex flex-col gap-1 p-12 text-zinc-300 ">
                    <p className="text-3xl mt-8 font-bold text-white">
                      {data.fullName}
                    </p>
                    <p className="flex items-center gap-6">
                      <div>@{data.username}</div>
                      <div className="flex items-center gap-1">
                        {" "}
                        <HiOutlineMail />
                        {data.email}
                      </div>
                    </p>
                    <div className="flex gap-4">
                      <p className="flex items-center gap-1">
                        <IoLocationOutline />
                        {data.location}
                      </p>
                      <p className="flex items-center gap-1">
                        <LiaBirthdayCakeSolid /> {data.dob}
                      </p>
                    </div>
                    <i className="w-full h-24">{data.bio}</i>
                    <Link
                      to="/editprofile"
                      className="h-10 w-28 p-3 mt-2 bg-blue-700 rounded-lg flex justify-center items-center"
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <div className="flex flex-col h-full w-1/2 p-12 text-white">
                    <div className="h-1/2 w-full text-end ">
                      <p>Current role</p>
                      <p className="font-semibold h-10 px-1 ml-52 flex justify-center items-center mt-2 bg-zinc-800 rounded-2xl">
                        {data.jobTitle || "not mentioned"}
                      </p>
                    </div>
                    <div className="h-1/2 w-full text-end -mt-5">
                      <p>Skills</p>
                      <div className="h-24 w-full flex flex-wrap justify-end gap-3">
                        {data.skills && data.skills.length > 0 ? (
                          data.skills.map((skill, index) => (
                            <p
                              key={index}
                              className="font-semibold mt-2 px-3 h-10 bg-zinc-800 rounded-2xl flex justify-center items-center"
                            >
                              {skill}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-400">No skills added</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-[24vw] bg-black flex flex-col rounded-3xl text-white p-10">
                <p className="text-2xl font-semibold tracking-wide ">
                  People also viewed
                </p>
                <div className="flex flex-col mt-12 gap-2 scrollbar-hide overflow-y-scroll">
                  {users.length > 0 ? (
                    [...users].reverse().map((user) => (
                      <div
                        key={user._id}
                        className="users w-full flex items-center gap-4"
                      >
                        <img
                          src={user.profilePicture?.url || defaultProfile}
                          className="profile h-10 w-10 rounded-full"
                        />
                        <div className="flex justify-between w-full items-center">
                          <div>
                            <p className="font-semibold">@{user.username}</p>
                            <p className="text-gray-500 ">
                              {user.jobTitle || "Not Mentioned"}
                            </p>
                          </div>
                          <Link
                            to={`/userprofile/${user._id}`}
                            className="text-blue-500"
                          >
                            visit
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">Loading users...</p>
                  )}
                </div>
                <div className=" mt-5 -mb-5 font-semibold bottom-24 ml-24 text-blue-500">
                  Scroll for more
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-full bg-black text-white transition-all duration-500 flex justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 flex justify-center items-center text-[200px] font-bold font-custom text-gray-200 opacity-100 transition-opacity duration-500 drop-shadow-[6px_6px_0px_#7C3AED]">
            {bgText}
          </div>

          <div className="h-full w-full flex justify-center items-center gap-5 ml-32 mt-44 relative">
            {triangles.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="group relative"
                onMouseEnter={() => setBgText(item.text)}
                onMouseLeave={() => setBgText("")}
              >
                <div
                  className={`triangle ${
                    index % 2 === 0 ? "downTriangle" : "upTriangle"
                  } `}
                >
                  <div className="triangleContent"></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute font-bold bottom-20 font-custom text-violet-500">
            Hover on it.
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
