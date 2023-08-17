import AllProducts from "./pages/AllProducts.jsx";
import Welcome from "./pages/welcome.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/" element={<AllProducts />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
