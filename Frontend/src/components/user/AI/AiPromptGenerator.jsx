import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { TiSocialGithub } from "react-icons/ti";
import "../../../App.css";
import { FaArrowUp } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import { Copy } from "lucide-react";

const AiPromptGenerator = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [typingAnswer, setTypingAnswer] = useState("");

  const { user } = useContext(AuthContext);
  const [userdata, setUserData] = useState("");

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, typingAnswer, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_AI_API
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      const aiResponse =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      displayTypingEffect(aiResponse);
    } catch (error) {
      console.log(error);
      displayTypingEffect("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  function displayTypingEffect(fullText) {
    let index = 0;
    setTypingAnswer("");

    const typingInterval = setInterval(() => {
      setTypingAnswer((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
        setChatHistory((prev) => [
          ...prev,
          { type: "answer", content: fullText },
        ]);
        setTypingAnswer("");
      }
    }, 10);
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3030/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
    };
    if (user) fetchData();
  }, [user]);

  return (
    <div className="fixed inset-0 textColor bg-gradient-to-r bg-zinc-950 text-white font-custom">
      {/* Conditional Layout */}
      {chatHistory.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-center p-4">
          <div className="space-y-6 mb-10 w-full ">
            <h1 className="font-extrabold tracking-tighter text-6xl">
              Hello
              <span className="text-violet-600">
                {userdata && `, ${userdata.username}`}
              </span>
            </h1>
          </div>
          <form onSubmit={generateAnswer} className="w-full max-w-3xl relative">
            <div className="relative">
              <div className="p-[1px] rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-[length:200%_200%] animate-gradient-border">
                <textarea
                  required
                  className="w-full h-36 bg-zinc-950 border-none placeholder:text-sm placeholder:font-semibold placeholder:text-zinc-500 rounded-xl p-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all duration-200"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="How can I help you today?"
                  rows="4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateAnswer(e);
                    }
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`absolute bottom-4 right-4 p-2 bg-zinc-800 text-zinc-300 rounded-full transition hover:bg-zinc-700 hover:text-white ${
                  generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={generatingAnswer}
              >
                <FaArrowUp size={18} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-2 mt-20 rounded-lg bg-transparent shadow-lg p-10 scrollbar-hide"
          >
            {chatHistory.map((chat, index) => (
              <div className="flex items-start mb-4" key={index}>
                {/* User Question */}
                {chat.type === "question" ? (
                  <div className="h-8 w-8 rounded-lg mt-1 overflow-hidden">
                    {userdata?.profilePicture?.url ? (
                      <img
                        src={userdata.profilePicture.url}
                        alt="User Profile"
                        className="h-full w-full object-cover rounded-lg border border-gray-700"
                      />
                    ) : (
                      <div className="h-full w-full bg-custom-gradient rounded-full"></div>
                    )}
                  </div>
                ) : (
                  /* AI Answer */
                  <div className="logo h-8 w-8 bg-white rounded-lg flex justify-center items-center text-black font-bold mr-3 mt-1 shadow-md">
                    <p>{`</>`}</p>
                  </div>
                )}

                {/* Chat Content */}
                <div
                  className={`relative inline-block max-w-[80%] tracking-wider text-sm p-3 rounded-lg overflow-auto scrollbar-hide ${
                    chat.type === "question"
                      ? "text-white p-4 "
                      : "text-zinc-300 p-5 bg-zinc-900 w-full rounded-md"
                  }`}
                >
                  <ReactMarkdown className="overflow-auto scrollbar-hide">
                    {chat.content}
                  </ReactMarkdown>

                  {/* Copy Button for AI Answers */}
                  {chat.type !== "question" && (
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(chat.content)
                      }
                      className="absolute top-2 right-2 text-zinc-400 hover:text-white"
                      title="Copy"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {typingAnswer && (
              <div className="mb-4 text-left">
                <div className="inline-block max-w-[80%] p-3 ml-6 text-zinc-300">
                  <ReactMarkdown>{typingAnswer}</ReactMarkdown>
                </div>
              </div>
            )}
            {generatingAnswer && (
              <div className="text-left">
                <div className="inline-block bg-zinc-950 textColor text-sm p-3 rounded-lg animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={generateAnswer}
            className="bg-zinc-950 textColor flex flex-col rounded-lg justify-center items-center shadow-lg p-4"
          >
            <div className="relative w-full">
              <div className="relative">
                <textarea
                  required
                  className="flex-1 w-full h-24 bg-zinc-950 border border-gray-800 placeholder:text-sm placeholder:font-semibold placeholder:text-zinc-500 rounded-md p-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-700"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="How can I help you today?"
                  rows="2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateAnswer(e);
                    }
                  }}
                ></textarea>

                {/* Button inside the textarea container */}
                <button
                  type="submit"
                  className={`absolute bottom-4 right-4 p-2 bg-zinc-800 text-zinc-500 rounded-full hover:bg-zinc-700 hover:text-white transition ${
                    generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={generatingAnswer}
                >
                  <FaArrowUp size={20} />
                </button>
              </div>
            </div>

            <p className="text-zinc-600 mt-3 font-semibold text-xs">
              NexCode AI can make mistakes. Check important info.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiPromptGenerator;
