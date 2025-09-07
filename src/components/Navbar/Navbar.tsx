import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
  Select,
  MenuItem as LangMenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LockOutlined, DensityMedium } from "@mui/icons-material";
import HalalLogo from "../../assets/img/halal-logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { setLang, setDir } from "../../app/slices/settingsSlice";
import "./navbar.scss";

export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["general", "navbar"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const langs = [
    { Label: t("english", { ns: "general" }), value: "en", dir: "ltr" },
    { Label: t("arabic", { ns: "general" }), value: "ar", dir: "rtl" },
  ];
  const isTransparent = useSelector(
    (state: RootState) => state.navbar.isTransparent
  );
  const { lang } = useSelector((state: RootState) => state.settings);
  const handleLangClick = (value: string, dir: string) => {
    i18n.changeLanguage(value);

    dispatch(setLang(value));
    dispatch(setDir(dir));
    document.documentElement.dir = dir;
    document.documentElement.lang = value;
    i18n.changeLanguage(value);
  };
  const publicNavItems = [
    { label: t("home", { ns: "navbar" }), path: "/" },
    { label: t("aboutUs", { ns: "navbar" }), path: "/about-us" },
    { label: t("services", { ns: "navbar" }), path: "/services" },
    {
      label: t("certifiedProducts", { ns: "navbar" }),
      path: "/certified-products",
    },
    {
      label: t("accreditationAndCertifications", { ns: "navbar" }),
      path: "/accrediation-and-certifications",
    },
    { label: t("contactUs", { ns: "navbar" }), path: "/contact-us" },
  ];

  const userNavItems = [
    { label: t("orders", { ns: "navbar" }), path: "/orders" },
    { label: t("users", { ns: "navbar" }), path: "/users" },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  const drawerItems = isAuthenticated ? userNavItems : publicNavItems;

  return (
    <>
      <AppBar
        position="static"
        className={`navbar ${isTransparent ? "transparent" : ""}`}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={isMobile ? 1 : 0}>
            <IconButton edge="start" color="inherit" sx={{ p: 0 }}>
              <img src={HalalLogo} alt="Logo" className="logo" />
            </IconButton>
          </Box>

          <Stack
            direction="column"
            spacing={isMobile ? 2 : 3}
            alignItems={isMobile ? "center" : "flex-end"}
            sx={{ flexGrow: 1, width: "100%" }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent={isMobile ? "center" : "flex-end"}
              sx={{ width: "100%" }}
            >
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleLogout}
                    startIcon={<LockOutlined />}
                    className="logoutBtn"
                    sx={{ fontSize: "0.85rem", color: "#ccc" }}
                  >
                    {t("logout", { ns: "general" })}
                  </Button>
                  <Typography sx={{ fontSize: "0.9rem", color: "#fff" }}>
                    {user?.login}
                  </Typography>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/sign-in")}
                  startIcon={<LockOutlined />}
                  className="signInBtn"
                >
                  {t("signIn", { ns: "general" })}
                </Button>
              )}

              {!isMobile && (
                <Typography sx={{ fontSize: "0.85rem", color: "#ccc" }}>
                  {t("changeLang", { ns: "general" })}
                </Typography>
              )}

              <Select
                variant="outlined"
                size="small"
                value={lang}
                className="languageSelect"
              >
                {/* <LangMenuItem value="en">🇬🇧 English</LangMenuItem>
                <LangMenuItem value="ar">🇸🇦 Arabic</LangMenuItem> */}
                {langs.map((item) => (
                  <LangMenuItem
                    value={item.value}
                    onClick={() => handleLangClick(item.value, item.dir)}
                  >
                    {item.Label}
                  </LangMenuItem>
                ))}
              </Select>

              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={toggleDrawer(true)}
                >
                  <DensityMedium />
                </IconButton>
              )}
            </Stack>

            {!isMobile && (
              <Box>
                {(isAuthenticated ? userNavItems : publicNavItems).map(
                  ({ label, path }, index) => {
                    const isActive = window.location.pathname === path;
                    return (
                      <Button
                        key={index}
                        onClick={() => navigate(path)}
                        className={`navItem ${isActive ? "active" : ""}`}
                      >
                        {label}
                      </Button>
                    );
                  }
                )}
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "#242424", color: "#ccc", width: 300 },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <IconButton edge="start" color="inherit" sx={{ p: 0 }}>
              <img src={HalalLogo} alt="Logo" className="logo" />
            </IconButton>
          </Box>

          <List sx={{ width: "100%" }}>
            {drawerItems.map(({ label, path }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
