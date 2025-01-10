import { Box, Typography } from "@mui/material";
import aboutImage from "../../assets/1-de409839.jpg";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer.jsx";
import Aside from "../../components/Aside/Aside.jsx";

const AboutPage = () => {
  return (
    <ResponsiveDrawer asideContent={<Aside />}>
      <Box
        sx={{
          width: { xs: "100%", md: "1190px" },
          backgroundImage: `url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "50vh", sm: "90vh", md: "100vh" },
        }}
      ></Box>

      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          I'm <span style={{ color: "#007BFF" }}>Alison Ryder</span>
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          a Ukrainian Blogger & Adventure Seeker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Life is a road, and I am here to ride it. Born to explore the world on
          two wheels, I have traded comfort for freedom and found my true self
          on the highways and hidden trails. <br /> Through my blog, I share
          stories of breathtaking landscapes, unexpected encounters, and the
          thrill of motorcycle travel. Whether it is conquering mountain passes,
          navigating bustling cities, or camping under a starry sky, every
          journey is a new adventure.
          <br /> Let us hit the road together and discover the magic that lies
          beyond the horizon.
        </Typography>
      </Box>
    </ResponsiveDrawer>
  );
};

export default AboutPage;
