import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilterDropdown from "./ProductFilterDropdown";
import {categoryListDropDownAction} from 'src/redux/slices/HomeSlice'

const ProductCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.home);

  //  useSelector
  return (
    <>
      <div className="flex justify-between font-medium mt-5">
        <div
          onClick={() => dispatch(categoryListDropDownAction(!data.categoryListDropDown))}
          className={`flex items-center space-x-1 cursor-pointer`}
        >
          <span className="text-md md:text-lg hover:text-yellow-700">
            Categories
          </span>
          <svg
            className="w-4 h-4 text-yellow-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div className="flex space-x-2">
          <div className={`flex items-center space-x-1 cursor-pointer`}>
            <span className="text-md md:text-lg">Filter</span>
            <span>
              <svg
                className="w-4 h-4 text-gray-700 text-yellow-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </span>
          </div>
          <span>/</span>
          <div className={`flex items-center space-x-1 cursor-pointer`}>
            <span className="text-md md:text-lg">Search</span>
            <span>
              <svg
                className="w-4 h-4 text-gray-700 text-yellow-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <ProductFilterDropdown />
    </>
  );
};

export default ProductCategory;
