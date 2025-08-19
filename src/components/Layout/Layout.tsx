import { Navbar } from "../Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>
        <p>© 2023 Your Company Name</p>
      </footer>
    </>
  );
};

export default Layout;
