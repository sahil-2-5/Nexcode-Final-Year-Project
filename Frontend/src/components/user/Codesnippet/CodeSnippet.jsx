import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import defaultProfile from "/Usericons/defaultPicture.jpg";
import axios from "axios";

const CodeSnippet = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/user/getCodeSnippet"
        );
        setSnippets(response.data);
      } catch (error) {
        console.error("Error fetching code snippets:", error);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <div className="p-5 h-auto w-full bg-zinc-950 text-white ">
      <header className="flex fixed backdrop-blur-sm justify-between items-center w-full">
        <Link to="/dashboard" className="HomeIcon">
          <MdOutlineArrowBackIos color="white" size={25} />
        </Link>
        <h1 className="text-4xl font-bold w-full ml-96 text-center text-white drop-shadow-[3px_3px_0px_#7C3AED]">
          Code Snippets
        </h1>

        <div className="w-full h-16 p-5 rounded-xl flex items-center justify-end gap-5 font-semibold">
          <Link to="/aiprompt" className="px-5 py-3 bg-zinc-800 rounded-xl">
            AI Prompts
          </Link>
          <Link
            to="/addnewsnippet"
            className="px-5 py-3 bg-zinc-800 rounded-xl"
          >
            New Code
          </Link>
          <Link
            to="/codeconverter"
            className="px-5 py-3 bg-zinc-800 rounded-xl"
          >
            Code Converter
          </Link>
        </div>
      </header>

      <div className="w-full mt-32">
        <div className="w-[70vw] h-full mt-3 ml-44 ">
          {snippets.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No code snippets available.
            </p>
          ) : (
            snippets
              .slice()
              .reverse()
              .map((snippet) => (
                <div
                  key={snippet._id}
                  className="container mt-5 bg-zinc-900 rounded-2xl flex flex-col p-8"
                >
                  <div className="userprofile flex gap-4 w-full h-12 items-center -mt-5 px-2">
                    <img
                      src={snippet.user?.profilePicture?.url || defaultProfile}
                      className="profile h-10 w-10 rounded-full"
                      alt="Profile"
                    />
                    <div className="font-semibold">
                      {snippet.user?.username || "Anonymous"}
                    </div>
                  </div>
                  <div className="w-full h-[12vh] flex items-center justify-between gap-5">
                    <div className="w-[140vh] px-5 border-2 border-zinc-600 p-3 rounded-xl">
                      {snippet.description}
                    </div>
                    <div className="px-5 py-3 bg-zinc-800 rounded-xl">
                      {snippet.language}
                    </div>
                  </div>
                  <pre className="codesnippet h-auto rounded-2xl border-2 border-zinc-600 p-3 overflow-x-auto text-sm">
                    {snippet.codeSnippet}
                  </pre>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
