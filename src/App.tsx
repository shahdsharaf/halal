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
function App() {
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
