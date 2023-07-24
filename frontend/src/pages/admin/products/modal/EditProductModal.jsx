import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAllCategory } from "src/shared/apiCall/category";
import { editProductReq } from "src/shared/apiCall/product";

const EditProductModal = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState();
  const {
    isEditProductModal,
    setIsEditProductModal,
    editProductData,
    fetchProducts,
  } = props;
  const [editFormData, setEditFormData] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pStatus: "",
    pImages: null,
    pEditImages: null,
    pCategory: "",
    pPrice: "",
    pOffer: "",
    pQuantity: "",
    success: false,
    error: false,
  });
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const fetchCategories = async () => {
    let { data: response } = await getAllCategory();
    if (response.Categories) {
      setCategories(response.Categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  // console.log(editProductData);
  useEffect(() => {
    if (isEditProductModal) {
      setEditFormData({
        pId: editProductData.pId,
        pName: editProductData.pName,
        pDescription: editProductData.pDescription,
        pImages: editProductData.pImages,
        pStatus: editProductData.pStatus,
        pCategory: editProductData.pCategory,
        pPrice: editProductData.pPrice,
        pOffer: editProductData.pOffer,
        pQuantity: editProductData.pQuantity,
      });
    }
  }, [isEditProductModal]);
  const submitForm = async e => {
    e.preventDefault();
    console.log(editFormData);
    setIsLoading(true);
    try {
      let { data: responseData } = await editProductReq(editFormData);
      console.log(responseData);
      if (responseData.success) {
        setEditFormData({
          ...editFormData,
          success: responseData.success,
        });
        setTimeout(() => {
          setEditFormData({
            ...editFormData,
            success: false,
          });
          setIsEditProductModal(false);
        }, 1000);
        fetchProducts();
      } else if (responseData.error) {
        setEditFormData({
          ...editFormData,
          error: responseData.error,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return ReactDOM.createPortal(
    <>
      {/* Black Overlay */}
      <div
        className={`${
          isEditProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          isEditProductModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div
          style={{ height: "90vh" }}
          className=" overflow-auto mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8"
        >
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={e => setIsEditProductModal(false)}
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
          {editFormData.success && alert(editFormData.success, "green")}
          {editFormData.error && alert(editFormData.error, "red")}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                  value={editFormData.pName}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                  value={editFormData.pPrice}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
                value={editFormData.pDescription}
                onChange={e =>
                  setEditFormData({
                    ...editFormData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image">Product Images *</label>
              {editFormData.pImages && (
                <div className="flex">
                  {editFormData.pImages.map((image, id) => {
                    return (
                      <img
                        key={id}
                        className="h-16 w-16 object-cover"
                        src={image}
                        alt="productImage"
                      />
                    );
                  })}
                </div>
              )}
              <span className="text-gray-600 text-xs">Must need 2 images</span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                id="image"
                onChange={e =>
                  setEditFormData({
                    ...editFormData,
                    error: false,
                    success: false,
                    pEditImages: [...e.target.files],
                  })
                }
                multiple
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                  value={editFormData.pStatus}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="category">Product Category *</label>
                <select
                  name="category"
                  className="px-4 py-2 border focus:outline-none"
                  id="category"
                  value={editFormData?.pCategory?._id}
                  onChange={e => {
                    let matchCategory = categories?.find(
                      cat => cat._id === e.target.value
                    );
                    let _id = matchCategory._id;
                    let cName = matchCategory._cName;
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pCategory: { _id, cName },
                    });
                  }}
                >
                  <option disabled value="">
                    Select a category
                  </option>

                  {categories &&
                    categories.length > 0 &&
                    (categories.map(category => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.cName}
                        </option>
                      );
                    }): "")}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                  value={editFormData.pQuantity}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offfer (%) *</label>
                <input
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                  value={editFormData.pOffer}
                  onChange={e =>
                    setEditFormData({
                      ...editFormData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                // disabled={isLoading}
              >
                {isLoading ? "loading..." : "Update product"}
                {/* Update product */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

export default EditProductModal;
