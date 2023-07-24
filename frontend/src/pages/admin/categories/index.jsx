import React from "react";
import AdminLayout from "src/shared/components/AdminLayout";
import CategoryMenu from "./components/CategoryMenu";
import AllCategories from "./components/AllCategories";
const Categories = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 space-y-4 p-4">
        <CategoryMenu />
        <AllCategories />
      </div>
    </AdminLayout>
  );
};

export default Categories;
