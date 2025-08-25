import { Navbar } from "../Navbar/Navbar";
import { AppBreadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import "./layout.scss";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>
        <AppBreadcrumbs />
        {children}
      </div>
      <footer className="footer">
        <p className="footer__body">© 2025 Halal Market All Rights Reserved</p>
      </footer>
    </>
  );
};

export default Layout;
