import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Selection from "./pages/Selection";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Sidebar />

        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="/Profil/:userId" element={<Profil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

    </Router>
  );
};

export default App;