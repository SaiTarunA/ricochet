import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CART_PAGE_LINK, MAIN_PAGE_LINK, NO_PRODUCT_PAGE_LINK, SCAN_PAGE_LINK } from "./components/constants/Global";
import NavBar from "./components/nav-bar";
import Cart from "./components/sections/cart";
import ProductNotFound from "./components/sections/product-not-found";
import Scanner from "./components/sections/scanner";
import Welcome from "./components/sections/welcome";
import { setGlobalState, useGlobalState } from "./components/state";
import "./styles.css";

function App() {
  const [hasNavBar] = useGlobalState("hasNavBar");
  const [isWebCam] = useGlobalState("isWebCam");
  const location = useLocation();

  const sectionStyle = {
    minHeight: hasNavBar ? "calc(100vh - var(--nav-height))" : "100vh",
    marginTop: hasNavBar && "var(--nav-height)",
  };

  React.useEffect(() => {
    if(isWebCam === true) {
    setGlobalState("isWebCam", false)
    window.location.reload()
    }
  }, [location.pathname])

  return (
    <div className="App">
      {hasNavBar && <NavBar />}
      <Routes>
        <Route
          exact
          path={MAIN_PAGE_LINK}
          element={<Welcome hasNavBar={hasNavBar} sectionStyle={sectionStyle}/>}
        />
        <Route
          exact
          path={SCAN_PAGE_LINK}
          element={<Scanner hasNavBar={hasNavBar} sectionStyle={sectionStyle}/>}
        />
        <Route
          exact
          path={CART_PAGE_LINK}
          element={<Cart hasNavBar={hasNavBar} sectionStyle={sectionStyle}/>}
        />
        <Route
          exact
          path={NO_PRODUCT_PAGE_LINK}
          element={<ProductNotFound hasNavBar={hasNavBar} sectionStyle={sectionStyle}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
