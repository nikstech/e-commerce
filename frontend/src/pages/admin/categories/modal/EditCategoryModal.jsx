import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createCategory } from "src/shared/apiCall/category";
import { editCategoryReq } from "src/shared/apiCall/category";

const EditCategoryModal = props => {
  const {
    setIsEditCategory,
    editCategory,
    setIsEditCategoryModal,
    feachCategory,
  } = props;
  const [isLoading, setIsLoading] = useState();
  const [cId, setCId] = useState();
  const [des, setDes] = useState();
  const [status, setStatus] = useState();

  const alert = (msg, type) => {
    return <div className={`bg-${type}-200 py-2 px-4 w-full `}>{msg}</div>;
  };
  useEffect(() => {
    if (EditCategoryModal) {
      setCId(editCategory.cId);
      setDes(editCategory.cDescription);
      setStatus(editCategory.cStatus);
    }
  }, [EditCategoryModal]);
  // console.warn(editCategory);
  const submitForm = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      let res = await editCategoryReq(cId, des, status);
      feachCategory();
      if (res.success) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsEditCategoryModal(false);
    }
  };
  return ReactDOM.createPortal(
    <>
      {/* Black Overlay */}
      <div
        className={`fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Category
            </span>
            {/* Close Modal */}
            <span
              onClick={() => setIsEditCategoryModal(false)}
              style={{ background: "#303031" }}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
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
            </span>
          </div>
          {/* form */}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Category Name</label>
              <input
                className="px-4 py-2 border focus:outline-none"
                type="text"
                value={editCategory.cName}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Category Description</label>
              <textarea
                value={des}
                onChange={e => setDes(e.target.value)}
                className="px-4 py-2 border focus:outline-none"
                cols={5}
                rows={5}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="status">Category Status</label>
              <select
                name="status"
                className="px-4 py-2 border focus:outline-none"
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option name="status" value="Active">
                  Active
                </option>
                <option name="status" value="Disabled">
                  Disabled
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Edit Catogory"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

export default EditCategoryModal;
