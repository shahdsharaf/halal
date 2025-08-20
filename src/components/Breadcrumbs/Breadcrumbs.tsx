import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "@mui/material/utils";

export const AppBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null;

  const current = pathnames[pathnames.length - 1];

  return (
    <Breadcrumbs
      separator="/ "
      aria-label="breadcrumb"
      sx={{ my: 2, fontSize: "1rem", ml: 4 }}
    >
      <Link
        underline="hover"
        color="text.primary"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      <Typography color="inherit">
        {capitalize(current.replace(/-/g, " "))}
      </Typography>
    </Breadcrumbs>
  );
};
