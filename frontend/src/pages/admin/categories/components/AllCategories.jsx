import React, { useState, useEffect } from "react";
import { getAllCategory, deleteCategory } from "src/shared/apiCall/category";
import CategoryTable from "./CategoryTable";
import { getCategories } from "src/redux/slices/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import EditCategoryModal from "../modal/EditCategoryModal";

const AllCategories = () => {
  //   const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditCategoryModal, setIsEditCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState({
    cName: "",
    cDescription: "",
    cStatus: "",
  });
  const allCategoriesData = useSelector(state => state.category.allCategory);
  const dispatch = useDispatch();
  const feachCategory = async () => {
    setIsLoading(true);
    try {
      let { data: responseData } = await getAllCategory();
      if (responseData.Categories) {
        dispatch(getCategories(responseData.Categories));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const deleteCat = async cId => {
    try {
      let { data } = await deleteCategory(cId);
      if (data.success) {
        feachCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editCategoryReq = (cId, cName, cDescription, cStatus) => {
    setEditCategory({ cId, cName, cDescription, cStatus });
    setIsEditCategoryModal(true);
  };
  useEffect(() => {
    feachCategory();
  }, []);

  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCategoriesData && allCategoriesData.length > 0 ? (
              allCategoriesData.map((item, id) => {
                return (
                  <CategoryTable
                    category={item}
                    key={id}
                    deleteCat={deleteCat}
                    editCategoryReq={editCategoryReq}
                    setIsEditCategoryModal={setIsEditCategoryModal}
                  />
                );
              })
            ) : (
              <tr cospan="7">No Data</tr>
            )}
          </tbody>
        </table>
        {/* <h3 className="text-lg text-gray-600 mt-2">{`Total ${allCategoriesData.length} category found`}</h3> */}
      </div> 
      {/* edit modal  */}
      {!isEditCategoryModal ? (
        ""
      ) : (
        <EditCategoryModal
          setIsEditCategoryModal={setIsEditCategoryModal}
          editCategory={editCategory}
          feachCategory={feachCategory}
          // editCategoryData={editCategoryData}
        />
      )}     
    </>
  );
};

export default AllCategories;
