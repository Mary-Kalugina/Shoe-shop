import { Route, Routes } from 'react-router-dom';
import './index.css';
import Cart from './components/pages/Cart';
import Catalog from './components/pages/CatalogPage';
import Page404 from './components/pages/404';
import About from './components/pages/About';
import Contacts from './components/pages/Contacts';
import Main from './components/pages/Main';
import ProductPage from './components/pages/ProductPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/catalog.html" element={<Catalog />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/contacts.html" element={<Contacts />} />
        <Route path="/cart.html" element={<Cart />} />
        <Route path="/catalog/:id.html" element={<ProductPage />} />
        <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;