import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "@mui/material/utils";

export const AppBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null;

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

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={to} color="inherit">
            {capitalize(value.replace(/-/g, " "))}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            color="text.primary"
            onClick={() => navigate(to)}
            sx={{ cursor: "pointer" }}
          >
            {capitalize(value.replace(/-/g, " "))}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
