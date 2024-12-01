import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // الصفحة الرئيسية
import Products from './pages/Catalog/Catalog'; // صفحة المنتجات
import SignUp from "./pages/SiginUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import ProviderApplicationForm from "./pages/provider.jsx";

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
        <Route path="/provider" element={<ProviderApplicationForm />} />
      </Routes>
    </Router>

  );
}

export default App;
