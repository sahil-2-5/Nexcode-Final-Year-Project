const NewsItems = ({ title, description, src, url }) => {
  return (
    <div className="max-w-md h-auto p-3 bg-zinc-800 mx-auto shadow-lg rounded-lg overflow-hidden">

      <div className="relative">
        <img
          className="w-full h-56 rounded-lg object-cover object-center"
          src={src || "https://via.placeholder.com/400"}
          alt={title || "News Image"}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-white line-clamp-2">{title || "No Title Available"}</h2>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">{description || "No description available."}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm font-semibold text-blue-500 hover:text-blue-600"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default NewsItems;
