import React from "react";

import femaleRobo from "/Background/image/femaleRobo.jpg";
import codeSnip from "/Background/image/codesnip.jpg";
import maskRobo from "/Background/image/maskRobo.jpg";
import yell from "/Background/image/yell.jpg";
import malerobo from "/Background/image/malerobo.jpg";
import nexgram from "/Background/image/nexgram.jpg";
import aihub from "/Background/image/aihub.jpg";


const Features = () => {
  return (
    <>
      <div className="p-16 bg-black text-white font-custom">
        <div className="module">
          <div className="moduleRank">01</div>

          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Artificial <br /> Intelligence
            </p>

            <div className="h-full w-full p-20 flex items-end">
              <div
                className="h-full w-full relative rounded-3xl text-gray-300 p-12 overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${yell})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <p className="text-9xl font-bold">AI Prompt Assistant</p>
                  <i>
                    An AI-powered tool for code generation, grammar correction,
                    and text summarization.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="module">
          <div className="moduleRank">02</div>
          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Daily News
              <br /> Updates
            </p>
            <div className="h-full w-full p-20 flex items-end">
              <div
                className="h-full w-full relative rounded-3xl text-gray-300 p-12 overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${femaleRobo})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">Developer News Hub</p>
                  <i>
                    Stay up to date with the latest trends, updates, and
                    insights in the developer community.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="module">
          <div className="moduleRank">03</div>
          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Code
              <br /> Snippet
            </p>
            <div className="h-full w-full p-20 flex items-end">
              <div
                className="h-full w-full relative text-gray-300 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${codeSnip})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

                <div className="relative z-10 text-gray-300 p-12 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">Code Snippet</p>
                  <i>
                    Effortlessly store, organize, and access your code snippets
                    in one place. Enhance productivity with quick retrieval and
                    seamless management of reusable code.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="module">
          <div className="moduleRank">04</div>
          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Task
              <br /> Manager
            </p>
            <div className="h-full w-full p-20 flex items-end">
              <div
                className="h-full w-full relative rounded-3xl text-gray-300 overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${malerobo})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

                <div className="relative z-10 text-gray-300 p-12 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">Task Manager</p>
                  <i>
                    Stay organized and manage your daily tasks effortlessly with
                    a simple and efficient to-do list.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="module">
          <div className="moduleRank">05</div>

          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Nex
              <br /> Overflow
            </p>

            <div className="h-full w-full p-20 flex items-end">
              <div
                className="h-full w-full relative rounded-3xl text-gray-300 overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${maskRobo})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

                <div className="relative z-10 text-gray-300 p-12 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">Nex Overflow</p>
                  <i>
                    Ask coding questions, find answers, and collaborate with
                    fellow developers in an interactive community.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 06 - Nexgram */}
        <div className="module">
          <div className="moduleRank">06</div>
          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              Nexgram
              <br /> Social Posts
            </p>
            <div className="h-full w-full p-20 flex items-end">
              <div className="h-full w-full relative rounded-3xl text-gray-300 overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${nexgram})` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
                <div className="relative z-10 text-gray-300 p-12 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">Nexgram</p>
                  <i>
                    Upload images with captions and share your thoughts with the
                    community. Engage through likes and comments in a modern
                    social space.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 07 - AI Hub */}
        <div className="module">
          <div className="moduleRank">07</div>
          <div className="w-full p-10 flex flex-col justify-between">
            <hr className="bg-black h-[5px] mt-20" />
            <p className="text-4xl font-bold mt-5">
              AI
              <br /> Hub
            </p>
            <div className="h-full w-full p-20 flex items-end">
              <div className="h-full w-full relative rounded-3xl text-gray-300 overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                  style={{ backgroundImage: `url(${aihub})` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
                <div className="relative z-10 text-gray-300 p-12 h-full flex flex-col justify-between">
                  <p className="text-9xl font-bold">AI Hub</p>
                  <i>
                    Discover a centralized hub for all your AI tools. Browse,
                    search, and explore tools by category for productivity,
                    creativity, and development.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
