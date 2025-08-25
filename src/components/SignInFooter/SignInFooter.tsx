import React from "react";
import { Link } from "@mui/material";
import "./sign-in-footer.scss";
const SignInFooter: React.FC = () => {
  return (
    <footer className="signin-footer">
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/about-us">ABOUT US</Link>
        </li>
        <li>
          <Link href="/services">SERVICES</Link>
        </li>
        <li>
          <Link href="/certified-products">CERTIFIED PRODUCTS</Link>
        </li>
        <li>
          <Link href="/accrediation-and-certifications">
            ACCREDITATION & CERTIFICATIONS
          </Link>
        </li>
        <li>
          <Link href="/contact-us">CONTACT US</Link>
        </li>
      </ul>
    </footer>
  );
};

export default SignInFooter;
