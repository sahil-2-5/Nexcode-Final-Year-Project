import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../App.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import defaultProfile from "/Usericons/defaultPicture.jpg";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineArrowBackIos } from "react-icons/md";

const GetAnswer = () => {
  const location = useLocation();
  const { question } = location.state;

  const { user } = useContext(AuthContext);
  const [userid, setUserId] = useState("");

  const [answers, setAnswers] = useState([]);

  const [answer, setAnswer] = useState("");

  const [username, setUsername] = useState(question?.user?.username);
  const [questionid, setQuestionid] = useState(question?._id);
  const [loading, setLoading] = useState(false); // Loading state
  const [charRemaining, setCharRemaining] = useState(1000); // Character limit state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const [userRes, answersRes] = await Promise.all([
          axios.get("http://localhost:3030/user/data", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3030/user/getAnswer/${question?._id}`),
        ]);

        setUserId(userRes.data);
        setAnswers(answersRes.data.answers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && question?._id) fetchData();
  }, [user, questionid]);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
  
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload(); // Reload the page once
    }
  }, []);

  const HandleUserAnswer = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    console.log(user);
    const newAnswer = {
      answer,
      userid : user?._id,
      username,
      questionid,
    };

    try {
      const res = await axios.post(
        "http://localhost:3030/user/addAnswer",
        newAnswer
      );

      if (res.data.status) {
        alert("Answer added successfully!");
        setAnswer("");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);
    setCharRemaining(1000 - value.length); // Update the remaining characters
  };

  if (!question) {
    return (
      <div className="text-center text-white">No question data available.</div>
    );
  }

  return (
    <div className="w-full p-8 bg-zinc-950 text-white">
      {/* Header Section */}
      <header className="flex items-center mb-8">
        <Link to="/nexcodeoverflow-data" className="HomeIcon mt-1 ml-1 p-5">
          <MdOutlineArrowBackIos color="white" size={25} />
        </Link>
        <h1 className="text-4xl font-extrabold text-center w-full">
          Answer In Details
        </h1>
      </header>
      <p>{ console.log("User Data:", user?._id)}</p>
      <div className="shadow-xl rounded-2xl px-8 py-6">
        {/* Question Content */}
        <div className="px-28 py-5 w-full">
          <div className="shadow border border-zinc-600 rounded-2xl flex items-center px-8 py-5 mb-6">

            <div>
              {/* Question Title */}
              <h2 className="text-3xl font-bold text-white">
                {question.title}
              </h2>

              {/* Question Description */}
              <div
                className="mb-4 text-zinc-300"
                dangerouslySetInnerHTML={{ __html: question.description }} // Rendering the Quill output
              />
              {/* Tags */}
              <div className="flex space-x-2 items-center mb-2 textColor text-sm">
                {question.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-zinc-900 px-3 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              {/* User Info */}
              <div className="mt-6 flex items-center space-x-2">
                <img
                  src={question?.user?.profilePicture?.url || defaultProfile}
                  className="profile h-10 w-10 rounded-full"
                />
                <div className="font-semibold">
                  {question.user?.username || "Anonymous"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="shadow-xl rounded-2xl w-full px-28 py-5">
        <h3 className="text-2xl font-semibold mb-4">Answers</h3>
        {answers?.length > 0 ? (
          answers?.map((answer, index) => (
            <div
              key={index}
              className="shadow border border-zinc-600 rounded-2xl p-10 w-full mb-6"
            >
              <div className="flex items-center space-x-4">

                <div className="w-full">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="font-semibold flex gap-2 items-center text-white">
                      <div
                        className="h-8 w-8 rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            answer?.profileImage?.[0]?.url || defaultProfile
                          })`,
                        }}
                      ></div>
                      <span>
                        {answer?.userProfile?.[0]?.username || "Anonymous"}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {new Date(
                        answer?.answers?.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div
                    className="mb-4 text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: answer?.answers?.answer,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No answers available yet.</div>
        )}
      </div>

    
      <div className="shadow-xl mt-10 rounded-2xl px-36 py-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Your Answer</h3>

      
        <ReactQuill
          theme="snow"
          value={answer}
          onChange={handleAnswerChange} 
          placeholder="Write your answer here..."
          style={{ height: "200px", marginBottom: "10px" }}
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

        <div className="mt-20 flex justify-between items-center">
          <button
            className="button"
            onClick={HandleUserAnswer}
            disabled={loading} 
          >
            {loading ? "Posting..." : "Post Your Answer"}
          </button>
          <span className="text-sm text-gray-400">
            Characters remaining: {charRemaining}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetAnswer;
