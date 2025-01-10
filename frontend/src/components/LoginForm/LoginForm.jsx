import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations.js";
import { TextField, Button, Box, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/posts/selectors";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    try {
      await dispatch(logIn(userData)).unwrap();
      toast.success("Successfully logged in!");
      navigate("/");
    } catch {
      toast.error("Login failed. Try again!");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        mt: { xs: 6, sm: 10 },
        border: 1,
        borderColor: "grey.400",
        borderRadius: 2,
        boxShadow: 1,
        width: { xs: "90%", sm: "400px" },
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      {isLoading && <Loader />}
      <Typography variant="h5" align="center" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "The password must contain at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
