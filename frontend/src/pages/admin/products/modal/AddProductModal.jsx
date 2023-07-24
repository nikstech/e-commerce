import React, { useState, useEffect } from "react";
import { getAllCategory } from "src/shared/apiCall/category";
import { createProduct } from "src/shared/apiCall/product";
import ReactDOM from "react-dom";
const AddProductModal = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAddProductModal, setIsAddProductModal } = props;
  const [categories, setCategories] = useState([]);
  const [fData, setFData] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null,
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    success: false,
    error: false,
  });

  const alert = (msg, type) => {
    return <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>;
  };

  const submitForm = async e => {
    e.preventDefault();
    if (!fData.pImage) {
      setFData({
        ...fData,
        error: "Please upload 2 images min",
      });
      setTimeout(() => {
        setFData({
          ...fData,
          error: false,
        });
      }, 2000);
      return "";
    }
    setIsLoading(true);
    try {
      let { data: responseData } = await createProduct(fData);
      if (responseData.error) {
        setFData({ ...fData, success: false, error: responseData.error });
      } else if (responseData.success) {
        setFData({
          pName: "",
          pPrice: "",
          pDescription: "",
          pImage: null,
          pCategory: "",
          pStatus: "Active",
          pOffer: 0,
          pQuantity: "",
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFData({
            pName: "",
            pPrice: "",
            pDescription: "",
            pImage: null,
            pCategory: "",
            pStatus: "Active",
            pOffer: 0,
            pQuantity: "",
            success: false,
            error: false,
          });
          setIsAddProductModal(false);
          return "";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const feachCategory = async () => {
    let { data } = await getAllCategory();
    setCategories(data.Categories);
  };
  useEffect(() => {
    feachCategory();
  }, []);

  return ReactDOM.createPortal(
    <>
      {/* Black Overlay */}
      <div
        className={`${
          !isAddProductModal && "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          !isAddProductModal && "hidden"
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              onClick={() => {
                setIsAddProductModal(false);
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
          {/* form */}
          {fData.error && alert(fData.error, "red")}
          {fData.success && alert(fData.success, "green")}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex space-x-1 py-1">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                  value={fData.pName}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
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
                  value={fData.pPrice}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
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
                value={fData.pDescription}
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    pDescription: e.target.value,
                  })
                }
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-2">
              <label htmlFor="image">Product Images *</label>
              <span className="text-gray-600 text-xs">Must need 2 images</span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                id="image"
                multiple
                onChange={e =>
                  setFData({
                    ...fData,
                    success: false,
                    error: false,
                    pImage: [...e.target.files],
                  })
                }
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-2">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                  value={fData.pStatus}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
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
                <label htmlFor="status">Product Category *</label>
                <select
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                  value={fData.pCategory}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
                      pCategory: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map((category, id) => {
                        return (
                          <option
                            name="status"
                            value={category._id}
                            key={category._id}
                          >
                            {category.cName}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-2">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                  value={fData.pQuantity}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
                      pQuantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offer (%) *</label>
                <input
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                  value={fData.pOffer}
                  onChange={e =>
                    setFData({
                      ...fData,
                      success: false,
                      error: false,
                      pOffer: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-2">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Create product"}
                {/* Creare Product */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

export default AddProductModal;
