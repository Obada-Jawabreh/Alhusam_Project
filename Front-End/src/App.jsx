import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // الصفحة الرئيسية
import Products from "./pages/Catalog/Catalog"; // صفحة المنتجات
import SignUp from "./pages/SiginUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
 
import ProviderDashboard from "./pages/providerDashboard/Dashboard.jsx";

 
import ProductDetailPage from "./pages/Detailes/Detailes.jsx";

import ProviderApplicationForm from "./pages/provider.jsx";
import UserProfile from "./pages/userProfile.jsx";
 

function App() {
  return (
    <Router>
      <Routes>
        {/* مسار الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
 
        <Route path="/userprofile" element={<UserProfile />} />
 

        {/* مسار صفحة المنتجات */}
        <Route path="/products" element={<Products />} />
 


        <Route path="/providerDashboard" element={<ProviderDashboard />} />

        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/provider" element={<ProviderApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
