import { Typography, Stack, Box, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EgyptFlag from "../../assets/img/egypt-flag.svg";
import IndiaFlag from "../../assets/img/india-flag.svg";
import { useTranslation } from "react-i18next";
import "./need-help.scss";
type Props = {
  className?: string;
};
export const NeedHelp = ({ className }: Props) => {
  const { t } = useTranslation(["contactUs"]);

  return (
    <div className={`need-help ${className ?? ""}`}>
      <Typography variant="h4" component="div" className="need-help__title">
        {t("needHelp", { ns: "contactUs" })}
      </Typography>
      <Typography
        variant="body1"
        component="div"
        className="need-help__description"
      >
        {t("helpDesc", { ns: "contactUs" })}
      </Typography>
      <Box sx={{ p: 4 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start" mb={4}>
          <img src={EgyptFlag} alt="Egypt Flag" className="flag" />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {t("egyptBranch", { ns: "contactUs" })}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <EmailIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                {t("email", { ns: "contactUs" })}
              </Typography>
            </Stack>
            <Typography variant="body2">egypt@halal-market.org</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Stack direction="row" spacing={2} alignItems="flex-start" mb={4}>
          <img src={IndiaFlag} alt="India Flag" className="flag" />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {t("indiaBranch", { ns: "contactUs" })}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <LocationOnIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                {t("address", { ns: "contactUs" })}
              </Typography>
            </Stack>
            <Typography variant="body2">
              {t("indiaAddress", { ns: "contactUs" })}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <EmailIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                {t("email", { ns: "contactUs" })}
              </Typography>
            </Stack>
            <Typography variant="body2">india@halal-market.org</Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <PhoneIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                {t("phone", { ns: "contactUs" })}
              </Typography>
            </Stack>
            <Typography variant="body2">+91 9958424402</Typography>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
