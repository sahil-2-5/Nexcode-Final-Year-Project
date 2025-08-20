import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "../../../App.css";
import axios from "axios";
import defaultProfile from "/Usericons/defaultPicture.jpg";

const OverFlow = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3030/user/getAllQuestion`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Filter questions based on title or tags
  const filteredQuestions = questions.filter((question) => {
    const titleMatch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const tagMatch = question.tags?.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return titleMatch || tagMatch;
  });

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-hide text-white mx-auto p-3 bg-zinc-950">
      <header className="flex items-center mb-6">
        <Link to="/dashboard" className="HomeIcon mt-1 ml-1 p-5">
          <MdOutlineArrowBackIos color="white" size={25} />
        </Link>
        <h1 className="text-5xl w-full text-center font-extrabold text-gray-200 drop-shadow-[3px_3px_0px_#7C3AED]">
          NexCodeOverFlow
        </h1>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-12">
        <h2 className="text-xl font-semibold text-white">Recent Questions</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by question or tag..."
            className="px-4 py-2 rounded-xl bg-zinc-950 text-white w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/askquestion-data" state={{ data }}>
            <div className="button bg-blue-500 text-white px-4 py-2 rounded-md">
              Ask Question
            </div>
          </Link>
        </div>
      </div>

      <div className="px-28 py-5 w-full">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, index) => (
            <div
              key={question._id || index}
              className="shadow border border-zinc-600 rounded-2xl px-8 py-5 mb-6"
            >
              <Link
                to="/getanswer-data"
                state={{ question, data }}
                className="text-2xl font-semibold hover:underline hover:underline-offset-4"
              >
                <span className="text-red-500">{"Q. ` "}</span>
                {question.title}
                <span className="text-red-500">{" `"}</span>
              </Link>
              <hr className="mt-2 mb-2 border-1 border-zinc-700" />
              <div
                className="mb-4 text-zinc-300"
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
              <hr className="mt-2 mb-2 border-1 border-zinc-700" />
              <div className="flex space-x-2 items-center mb-2 textColor text-sm">
                {question.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-zinc-900 px-3 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex space-x-2 items-center">
                  <img
                    src={question?.user?.profilePicture?.url || defaultProfile}
                    className="profile h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {question.user.username || "Anonymous"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(question.createdAt).toLocaleDateString()} •{" "}
                      <Link
                        to="/getanswer-data"
                        state={{ question, data }}
                        className="text-green-500"
                      >
                        {question.status || "open"}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm mr-6 mt-2 gap-2">
                  <p className="bg-zinc-900 px-3 py-1 rounded-lg">
                    Answer : {question?.answers?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default OverFlow;
