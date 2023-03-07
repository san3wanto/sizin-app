import React from "react";
import NavB from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavB />
      <div className="columns mt-6">
        <div className="column has-background-white">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
