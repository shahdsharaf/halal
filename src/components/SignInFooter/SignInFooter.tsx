import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./sign-in-footer.scss";
const SignInFooter: React.FC = () => {
  const { t } = useTranslation(["navbar"]);

  return (
    <footer className="signin-footer">
      <ul>
        <li>
          <Link href="/">{t("home", { ns: "navbar" })}</Link>
        </li>
        <li>
          <Link href="/about-us">{t("aboutUs", { ns: "navbar" })}</Link>
        </li>
        <li>
          <Link href="/services">{t("services", { ns: "navbar" })}</Link>
        </li>
        <li>
          <Link href="/certified-products">
            {t("certifiedProducts", { ns: "navbar" })}
          </Link>
        </li>
        <li>
          <Link href="/accrediation-and-certifications">
            {t("accreditationAndCertifications", { ns: "navbar" })}
          </Link>
        </li>
        <li>
          <Link href="/contact-us">{t("contactUs", { ns: "navbar" })}</Link>
        </li>
      </ul>
    </footer>
  );
};

export default SignInFooter;
