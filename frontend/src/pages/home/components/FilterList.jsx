import React from "react";

const FilterList = () => {
  return (
    <div className={`hidden my-4`}>
      <hr />
      <div className="w-full flex flex-col">
        <div className="font-medium py-2">Filter by price</div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2  w-2/3 lg:w-2/4">
            <label htmlFor="points" className="text-sm">
              Price (between 0 and 10$):{" "}
              <span className="font-semibold text-yellow-700">50.00$</span>
            </label>
            <input
              value="50"
              className="slider"
              type="range"
              id="points"
              min="0"
              max="1000"
              step="10"
            />
          </div>
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
      </div>
    </div>
  );
};

export default FilterList;
