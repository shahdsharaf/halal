import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { Services } from "./pages/Services/Services";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { AccrediationAndCertifications } from "./pages/AccrediationAndCertifictaions/AccrediationAndCertifications";
import { CertifiedProducts } from "./pages/CertifiedProducts/CertifiedProducts";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Orders } from "./pages/Orders/Orders";
import { Users } from "./pages/Users/Users";
import { CreateOrder } from "./pages/CreateOrder/CreateOrder";
import { EditOrder } from "./pages/EditOrder/EditOrder";
import ProtectedRoute from "./routes/ProtectedRoutes";
import axios from "axios";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/accrediation-and-certifications"
            element={<AccrediationAndCertifications />}
          />
          <Route path="/certified-products" element={<CertifiedProducts />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/create-order"
            element={
              <ProtectedRoute>
                <CreateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id/edit-order"
            element={
              <ProtectedRoute>
                <EditOrder />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer position="top-right" autoClose={1000} />
    </Router>
  );
}

export default App;
