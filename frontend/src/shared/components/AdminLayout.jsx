import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Footer from "./Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <section className="flex bg-grey-100">
        <AdminSidebar />
        <div className="w-full md:w-11/12 -full">{children}</div>
      </section>
      <Footer />
    </>
  );
};

export default AdminLayout;
