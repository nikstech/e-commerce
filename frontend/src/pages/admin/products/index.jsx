import AdminLayout from "src/shared/components/AdminLayout";
import ProductsMenu from "./components/ProductsMenu";
import AllProducts from "./components/AllProducts";

const Products = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 space-y-4 p-4">
        <ProductsMenu />
        <AllProducts/>
       
      </div>
    </AdminLayout>
  );
};

export default Products;

/*vs code extension
Quokka.js
Gitlens
CSS pick
Better comments


*/
