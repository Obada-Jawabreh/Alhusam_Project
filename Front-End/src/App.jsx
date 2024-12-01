import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // الصفحة الرئيسية
import Products from './pages/Catalog/Catalog'; // صفحة المنتجات
import SignUp from "./pages/SiginUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* مسار الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* مسار صفحة المنتجات */}
        <Route path="/products" element={<Products />} />
          
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
