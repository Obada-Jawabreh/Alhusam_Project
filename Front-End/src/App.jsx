import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // الصفحة الرئيسية
import Products from './pages/Catalog/Catalog'; // صفحة المنتجات

function App() {
  return (
    <Router>
      <Routes>
        {/* مسار الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* مسار صفحة المنتجات */}
        <Route path="/products" element={<Products />} />
        
      </Routes>
    </Router>
  );
}

export default App;
