import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createCategory } from "src/shared/apiCall/category";

const AddCategoryModal = props => {
  const { isAddCategoryModal, setIsAddCategoryModal } = props;
  const [isLoading, setIsLoading] = useState();
  const [fData, setFData] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });
  const alert = (msg, type) => {
    return <div className={`bg-${type}-200 py-2 px-4 w-full `}>{msg}</div>;
  };
  const submitForm = async e => {
    e.preventDefault();
    // console.log(fData);
    if (!fData.cImage) {
      return setFData({ ...fData, error: "Please first Upload Image" });
    }
    try {
      setIsLoading(true);
      let { data: responseData } = await createCategory(fData);
      console.log(responseData);
      if (responseData.error) {
        setFData({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          setFData({ ...fData, success: false, error: responseData.false });
        }, 2000);
      } else if (responseData.success) {
        setFData({
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          return setFData({
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsAddCategoryModal(false)
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Black Overlay */}
      <div
        className={`${
          !isAddCategoryModal && "hidden"
        }  fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          !isAddCategoryModal && "hidden"
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              onClick={() => {
                setIsAddCategoryModal(false);
              }}
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
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          {/* form */}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Category Name</label>
              <input
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                value={fData.cName}
                className="px-4 py-2 border focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Category Description</label>
              <textarea
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                value={fData.cDescription}
                className="px-4 py-2 border focus:outline-none"
                cols={5}
                rows={5}
              />
            </div>
            {/* Image Field & function */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="name">Category Image</label>
              <input
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    cImage: e.target.files[0],
                  })
                }
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="status">Category Status</label>
              <select
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
                name="status"
                className="px-4 py-2 border focus:outline-none"
                id="status"
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
                {isLoading ? "Loading..." : "Create Catogory"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

export default AddCategoryModal;
