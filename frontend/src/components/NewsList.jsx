import { Link } from "react-router-dom";
export const NewsList = ({ articles }) => {
  console.log(articles);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden min-h-40 flex items-end"
          style={{
            backgroundImage: `url(${article.urlToImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/80 opacity-80"></div>

          {/* Content */}
          <div className="relative z-10 p-4 text-white w-full">
            <h2 className="text-lg  font-bold mb-2 line-clamp-2">
              {article.title}
            </h2>

            <p className="text-sm  mb-2 line-clamp-3">{article.description}</p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
      <Link
        to="https://www.bbc.com/sport/cricket"
        className="min-h-40 flex items-center justify-center"
      >
        <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
          See All Articles →
        </button>
      </Link>
    </div>
  );
};
