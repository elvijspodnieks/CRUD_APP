import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Add from "./pages/AddUpdate"
import Change from "./pages/Change"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">

      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addnew" element={<Add />} />
          <Route path="/update/:id" element={<Add />} />
          <Route path="/change/:id" element={<Change />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
