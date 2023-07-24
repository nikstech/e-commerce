import React from "react";

const Search = () => {
  return (
    <div className={`hidden my-4 flex items-center justify-between`}>
      <input
        // value="search"
        className="px-4 text-xl py-4 focus:outline-none"
        type="text"
        placeholder="Search products..."
      />
      <div className="cursor-pointer">
        <svg
          className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default Search;
