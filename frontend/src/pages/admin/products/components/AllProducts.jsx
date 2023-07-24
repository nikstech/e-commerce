import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import EditProductModal from "../modal/EditProductModal";
import { getAllProduct, deleteProduct } from "src/shared/apiCall/product";
import { fetchProductsAction } from "src/redux/slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProductModal, setIsEditProductModal] = useState(false);
  const [editProductData, setEditProductData] = useState({});
  const allProducts = useSelector(state => state.product.allProducts);

  const dispatch = useDispatch();
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let { data: responseData } = await getAllProduct();
      if (responseData && responseData.Products)
        dispatch(fetchProductsAction(responseData.Products));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProductReq = async pId => {
    let { data } = await deleteProduct(pId);
    try {
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = (pId, product) => {
    setEditProductData({ pId, ...product });
    setIsEditProductModal(true);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
      <table className="table-auto border w-full my-2">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Stock</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Offer</th>
            <th className="px-4 py-2 border">Created at</th>
            <th className="px-4 py-2 border">Updated at</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product, id) => {
              return (
                <ProductTable
                  product={product}
                  key={product._id}
                  deleteProduct={deleteProductReq}
                  editProduct={editProduct}
                  setIsEditProductModal={setIsEditProductModal}
                />
              );
            })
          ) : (
            <tr colSpan="7">No Data</tr>
          )}

          <EditProductModal
            isEditProductModal={isEditProductModal}
            setIsEditProductModal={setIsEditProductModal}
            editProductData={editProductData}
            fetchProducts={fetchProducts}
          />
        </tbody>
      </table>
      {/* <h3 className="text-lg text-gray-600 mt-2">{`Total ${allCategoriesData.length} category found`}</h3> */}
    </div>
  );
};

export default AllProducts;
