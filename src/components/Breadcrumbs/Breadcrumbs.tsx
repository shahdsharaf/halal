import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { breadcrumbNameMap } from "../../features/nav/breadcrumbMap";

export const AppBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(["navbar"]);
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
        {t("home", { ns: "navbar" })}
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        const isId = /^\d+$/.test(value);
        if (isId) return null;

        const translationKey = breadcrumbNameMap[value];
        const label = translationKey
          ? t(translationKey, { ns: "navbar" })
          : value;

        return isLast ? (
          <Typography key={to} color="inherit">
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            color="text.primary"
            onClick={() => navigate(to)}
            sx={{ cursor: "pointer" }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
