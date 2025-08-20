import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Category = ({ setCategory }) => (
  <nav className="bg-transparent backdrop-blur-sm p-4 z-10 fixed w-full">
    <div className="mx-auto flex justify-between items-center">
      <Link to="/dashboard" className="HomeIcon mt-1 ml-1 p-5">
        <MdOutlineArrowBackIos color="white" size={25} />
      </Link>
      <div className="categories">
        <ul className="flex space-x-4">
          <li>
            <div
              onClick={() => setCategory("business")}
              className="newsCategory group"
            >
              <span className="text-lg">Business</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("entertainment")}
              className="newsCategory group"
            >
              <span className="text-lg">Entertainment</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("general")}
              className="newsCategory group"
            >
              <span className="text-lg">General</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("health")}
              className="newsCategory group"
            >
              <span className="text-lg">Health</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("science")}
              className="newsCategory group"
            >
              <span className="text-lg">Science</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("sports")}
              className="newsCategory group"
            >
              <span className="text-lg">Sports</span>
              <span className="underline"></span>
            </div>
          </li>
          <li>
            <div
              onClick={() => setCategory("technology")}
              className="newsCategory group"
            >
              <span className="text-lg">Technology</span>
              <span className="underline"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Category;
