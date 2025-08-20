import { Typography, Stack, Box, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EgyptFlag from "../../assets/img/egypt-flag.svg";
import IndiaFlag from "../../assets/img/india-flag.svg";
import "./need-help.scss";
type Props = {
  className?: string;
};
export const NeedHelp = ({ className }: Props) => {
  return (
    <div className={`need-help ${className ?? ""}`}>
      <Typography variant="h4" component="div" className="need-help__title">
        Need Help?
      </Typography>
      <Typography
        variant="body1"
        component="div"
        className="need-help__description"
      >
        If you have any question or inquiry please don't hesitate to send the
        inquiry message, and we reply to you as soon as.
      </Typography>
      <Box sx={{ p: 4 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start" mb={4}>
          <img src={EgyptFlag} alt="Egypt Flag" className="flag" />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Egypt Branch
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <EmailIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                Email
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
              India Branch
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <LocationOnIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                Address
              </Typography>
            </Stack>
            <Typography variant="body2">
              Office no# - A 1104, Advant IT, Business park, Noida sector 142,
              Uther paradesh, India
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <EmailIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                Email
              </Typography>
            </Stack>
            <Typography variant="body2">india@halal-market.org</Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <PhoneIcon sx={{ color: "red", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={500}>
                Phone
              </Typography>
            </Stack>
            <Typography variant="body2">+91 9958424402</Typography>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
