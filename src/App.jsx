import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Selection from "./pages/Selection";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";
import UserDataHandler from "./components/UserDataHandler";

const App = () => {
  return (
    <Router>
      <Header />
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="/Profil/:userId" element={<Profil />} />
          <Route path="/user/:userId" element={<UserDataHandler />} />
          <Route path="/user/:userId/*" element={<UserDataHandler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;