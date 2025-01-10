import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import Aside from "../../components/Aside/Aside.jsx";

const RegisterPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  return (
    <>
      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Box
        sx={{ display: "flex", minHeight: "100vh", pt: isMobile ? "64px" : 0 }}
      >
        {!isMobile && (
          <Box
            sx={{
              width: "200px",
              minHeight: "100vh",
              borderRight: "1px solid #000",
            }}
          >
            <Aside />
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
