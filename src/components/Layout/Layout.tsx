import { Navbar } from "../Navbar/Navbar";
import { AppBreadcrumbs } from "../Breadcrumbs/Breadcrumbs";
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
      <footer>
        <p>© 2023 Halal</p>
      </footer>
    </>
  );
};

export default Layout;
