import React from "react";
import Layout from "src/shared/components/Layout";
import SliderImage from "./components/SliderImage";
import ProductCategory from "./components/ProductCategory";
import Product from "./components/Product";
const Home = () => {
  return (
    <Layout>
      <SliderImage />
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Product />
      </section>
    </Layout>
  );
};

export default Home;
