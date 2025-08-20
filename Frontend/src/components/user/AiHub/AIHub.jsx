import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import AiBackground from "/Background/image/Ai.png";

const AIHub = () => {
  const [aitool, setAiTool] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const toolsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/admin/getAiTool"
        );
        if (response.data.status) {
          setAiTool(
            Array.isArray(response.data.tools) ? response.data.tools : []
          );
          console.log("AI Tools fetched successfully:", response.data.tools);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredTools = aitool.filter(
    (tool) =>
      tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || tool.category === category)
  );

  // Pagination Logic
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

  const categories = [
    "Image Generators",
    "Writing & Web SEO",
    "AI chat & Assistant",
    "Video Generators",
    "Text To Speech",
    "Education / Studies",
    "E-commerce",
    "AI Detection",
    "E-mail",
    "Logo Creation",
    "Websites & Design",
    "Image Editing",
    "Presentation",
    "Developer Tools",
  ];

  return (
    <div className="min-h-screen w-full p-6 bg-black text-white flex flex-col items-center relative">
      <div
        className="absolute top-0 w-full h-44 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,1)), url(${AiBackground})`,
        }}
      ></div>
      <div className="w-full flex justify-between items-center relative">
        <h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-[3px_3px_0px_#7C3AED]">
          AI Tools
        </h1>

        <div className="absolute top-6 right-6 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search AI Tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 px-5 w-72 border border-zinc-500 rounded-lg text-white bg-black drop-shadow-[2px_2px_0px_#7C3AED] placeholder-gray-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-zinc-500 w-72 rounded-lg text-white bg-black drop-shadow-[2px_2px_0px_#7C3AED]"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-24">
        {currentTools.map((tool, index) => (
         <div
         key={index}
         className="relative w-96 h-28 cursor-pointer group [perspective:1000px] drop-shadow-[2px_2px_0px_#7C3AED] hover:scale-105 transition-transform duration-300"
         onClick={() => window.open(tool.visitLink, "_blank")}
       >
         <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
           
           {/* Front Side */}
           <div className="absolute w-full h-full flex items-center gap-4 p-4 bg-zinc-900 text-white rounded-2xl shadow-lg [backface-visibility:hidden]">
             <img
               src={tool.iconUrl}
               alt={tool.toolName}
               className="w-12 h-12 rounded-lg"
             />
             <h2 className="text-md font-semibold">{tool.toolName}</h2>
             <p className="hidden">{tool.category}</p>
             <a
               href={tool.visitLink}
               target="_blank"
               rel="noopener noreferrer"
               className="absolute right-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
               onClick={(e) => e.stopPropagation()}
             >
               <ArrowRight size={24} />
             </a>
           </div>
       
           {/* Back Side */}
           <div className="absolute w-full h-full flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-2xl text-zinc-50 text-sm [transform:rotateX(180deg)] [backface-visibility:hidden]">
             <p className="mb-2 text-left">{tool.description}</p>
             <p className="text-violet-600 font-semibold">Explore Now</p>
           </div>
         </div>
       </div>
       
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 p-3 rounded-lg shadow-lg">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AIHub;
