import React, { useState, useEffect } from "react";
import { getAllCategory } from "src/shared/apiCall/category";
import { useSelector } from "react-redux";

const CategoryList = () => {
  const [category, setCategory] = useState(null);
  const data = useSelector(state => state.home);
  const fetchCategory = async () => {
    try {
      let { data: responseData } = await getAllCategory();
      setCategory(responseData.Categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <div className={`${!data.categoryListDropDown && "hidden"} my-4`}>
        <hr />
        <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {category && category.length > 0
            ? category.map((item, id) => {
                return (
                  <div
                    className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer"
                    key={id}
                  >
                    <img
                      src={item.cImage}
                      alt={item.cName}
                      style={{
                        width: "100%",
                        height: "13rem",
                        objectFit: "cover",
                      }}
                    />
                    <div className="font-medium">{item.cName}</div>
                  </div>
                );
              })
            : "No Data"}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
