import { useEffect } from "react";
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from './pages/MainLayout';
import Collection from './pages/Public/Components/Collection'
import Products from './pages/Public/Components/Products';
import ViewProduct from './pages/Public/Components/ViewProduct';
import Checkout from './pages/Public/Components/Checkout';
import Cart from './pages/Public/Components/Cart';
import Orders from './pages/Public/Components/Orders';
import Login from './pages/Public/auth/login';
import Register from './pages/Public/auth/Register';
import VerifyEmail from './pages/Public/auth/VerifyEmail';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SavedProvider } from './context/SavedContext';
import Saved from './pages/Public/Components/Saved';
import About from './pages/Public/Components/About';
import Contact from './pages/Public/Components/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <SavedProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path='/' element={<Collection />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<ViewProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
        </Routes>
        <ToastContainer />
      </SavedProvider>
      </CartProvider>
    </AuthProvider>
  )
}
