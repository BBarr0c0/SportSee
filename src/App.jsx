import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Selection from "./pages/Selection";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/Home/:userId" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;