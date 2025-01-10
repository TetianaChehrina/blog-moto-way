import { Box, Typography, TextField, Button } from "@mui/material";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import Aside from "../../components/Aside/Aside";

const ContactPage = () => {
  return (
    <ResponsiveDrawer asideContent={<Aside />}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
        >
          Contact Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            maxWidth: "900px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#f9f9f9",
              padding: 3,
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            <Typography>
              <strong>Address:</strong> 198 West 19th Street, Suite 721 Kyiv
              60016
            </Typography>
            <Typography>
              <strong>Phone:</strong> +1215 2355 98
            </Typography>
            <Typography>
              <strong>Email:</strong> info@yoursite.com
            </Typography>
            <Typography>
              <strong>Website:</strong> yoursite.com
            </Typography>
          </Box>

          <Box
            component="form"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#f9f9f9",
              padding: 3,
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            <TextField label="Your Name" fullWidth />
            <TextField label="Your Email" fullWidth />
            <TextField label="Subject" fullWidth />
            <TextField label="Message" fullWidth multiline rows={4} />
            <Button
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-start" }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
};

export default ContactPage;
