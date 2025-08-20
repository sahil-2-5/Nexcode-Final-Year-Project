import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";

const CodeConverter = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Python");
  const [converting, setConverting] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  async function convertCode(e) {
    e.preventDefault();
    if (!codeInput.trim()) return;

    setConverting(true);
    setChatHistory((prev) => [
      ...prev,
      { type: "input", content: `\`\`\`\n${codeInput}\n\`\`\`` },
    ]);

    const question = `Convert the following code to ${targetLanguage} and provide only the converted code without any explanation or extra text:\n\n${codeInput}`;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_AI_API
        }`,
        method: "post",
        data: { contents: [{ parts: [{ text: question }] }] },
      });

      const aiResponse =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "❌ Conversion failed!";

      setChatHistory((prev) => [
        ...prev,
        { type: "output", content: `\`\`\`\n${aiResponse}\n\`\`\`` },
      ]);
    } catch (error) {
      console.error("Conversion Error:", error.response || error.message);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "❌ Error: Unable to convert code. Try again!",
        },
      ]);
    }
    setConverting(false);
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"));
  }

  function clearHistory() {
    setChatHistory([]); // Clears chat history
  }

  return (
    <div className="fixed w-full text-white bg-gradient-to-r -mt-5 bg-zinc-950 p-10 font-custom">
      <header className="flex justify-between p-2 mt-2 items-center w-full">
        <Link to="/codesnippet" className="HomeIcon">
          <MdOutlineArrowBackIos color="white" size={25} />
        </Link>
        <h1 className="text-4xl font-extrabold">Code Converter</h1>
      </header>

      <div className="h-screen flex p-3 ">
        <form
          onSubmit={convertCode}
          className="bg-zinc-950 h-[625px] w-1/2 flex flex-col rounded-lg shadow-lg p-4"
        >
          <div className="flex gap-2">
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="p-2 bg-black rounded-md w-36 border-2 border-zinc-600"
            >
              <option>Python</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C++</option>
              <option>C#</option>
              <option>Go</option>
            </select>
          </div>

          <textarea
            required
            className="border w-full bg-zinc-950 border-zinc-600 rounded-md p-10 mt-2 resize-none scrollbar-hide"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Enter your code here..."
            rows="20"
          ></textarea>

          <button
            type="submit"
            className={`px-3 py-2 mt-2 bg-blue-500 text-white rounded-lg ${
              converting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={converting}
          >
            {converting ? "Converting..." : "Convert"}
          </button>
        </form>

        <div className="flex flex-col w-1/2">
          <div
            ref={chatContainerRef}
            className="h-[495px] overflow-y-auto border-2 border-zinc-600 mb-2 rounded-lg p-10 mt-16 scrollbar-hide"
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={
                  chat.type === "input" ? "text-zinc-400 " : "text-violet-400"
                }
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
                {chat.type === "output" && (
                  <button
                    onClick={() => copyToClipboard(chat.content)}
                    className="ml-2 text-white"
                  >
                    <FaCopy />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={clearHistory}
            className="px-3 py-2 bg-red-500 text-white rounded-lg w-full "
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeConverter;
