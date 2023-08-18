import AllProducts from "./pages/AllProducts.jsx";
import { useEffect } from "react";
import { getMe } from "./features/authSlice";
import Welcome from "./pages/welcome.jsx";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SearchResults from "./components/SearchResult";

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/Products" element={<AllProducts />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route exact path="/search" element={<SearchResults />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
