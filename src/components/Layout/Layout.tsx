import { Navbar } from "../Navbar/Navbar";
import { AppBreadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import "./layout.scss";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation(["general"]);
  return (
    <>
      <Navbar />
      <div>
        <AppBreadcrumbs />
        {children}
      </div>
      <footer className="footer">
        <p className="footer__body"> {t("footer", { ns: "general" })}</p>
      </footer>
    </>
  );
};

export default Layout;
