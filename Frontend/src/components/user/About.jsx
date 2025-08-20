const About = () => {
  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-zinc-300 px-6 py-12 flex flex-col justify-between overflow-hidden">
      {/* Background Logo in Center */}
      <div className="fixed inset-0 flex justify-center items-center z-0 opacity-5 pointer-events-none select-none">
        <div className="logo h-96 w-96 bg-white rounded-3xl flex justify-center items-center text-black font-bold shadow-lg text-7xl">
          <p>{`</>`}</p>
        </div>
      </div>

      {/* Heading */}
      <div className="relative z-10 text-6xl mb-20 text-center font-extrabold text-white drop-shadow-[3px_3px_0px_#7C3AED]">
        About Us
      </div>

      {/* Shared Section Wrapper */}
      <div className="relative z-10 text-zinc-300 space-y-24">
        {/* What is NexCode */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/3">
            <p className="uppercase text-sm font-bold mb-4">What is NexCode</p>
          </div>
          <div className="w-full md:w-[800px]">
            <h1 className="text-3xl sm:text-2xl md:text-5xl font-extrabold leading-tight">
              NexCode is your all-in-one developer platform. We help you <br />
              <span className="font-black inline-block">
                build
                <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 align-middle"></span>
              </span>,{" "}
              <span className="font-black inline-block">
                manage
                <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 align-middle"></span>
              </span>, and{" "}
              <span className="font-black inline-block">
                grow
                <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 align-middle"></span>
              </span>{" "}
              with tools designed to enhance your workflow—from code to collaboration.
            </h1>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/3">
            <p className="uppercase text-sm font-bold">Key Features</p>
          </div>
          <div className="w-full md:w-[800px] text-base space-y-4">
            <p><strong>AI-Powered Assistance:</strong> Generate code, fix grammar, and summarize text using integrated AI support.</p>
            <p><strong>Developer News Hub:</strong> Stay informed with real-time updates and curated tech news.</p>
            <p><strong>Code Management:</strong> Save, categorize, and access reusable code snippets with ease.</p>
            <p><strong>Task Management:</strong> Track tasks, set priorities, and stay productive with an intuitive interface.</p>
            <p><strong>Nex Overflow:</strong> Post coding questions, answer queries, and engage with the developer community.</p>
            <p><strong>NexGram:</strong> Share images and posts with your peers—engage with likes, comments, and more.</p>
            <p><strong>AI Tool Hub:</strong> Discover and explore categorized AI tools to boost your creativity and development.</p>
          </div>
        </div>

        {/* Vision */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/3">
            <p className="uppercase text-sm font-bold ml-5">Our Vision</p>
          </div>
          <div className="w-full md:w-[800px] text-base">
            <p>
              Our mission is to empower developers of all levels with modern tools and a community-driven platform.
              NexCode focuses on innovation, collaboration, and productivity—delivering solutions for the present and
              vision for the future.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 border-t border-gray-700 pt-8 text-center text-sm text-zinc-300 space-y-2">
        <p>Gmail: <a href="mailto:nexcode@gmail.com" className="text-blue-500 hover:underline">nexcode@gmail.com</a></p>
        <p>Contact No: <a href="tel:+919724690334" className="text-blue-500 hover:underline">9724690334</a></p>
        <p className="text-xs text-gray-600 mt-4">&copy; {new Date().getFullYear()} NexCode. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
