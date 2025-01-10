import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("Form Data:", formData);
    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Successfully registered!");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Try again!");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        mx: "auto",
        p: "16px",
        mt: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "@media (max-width:600px)": {
          width: "90%",
        },
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("username", { required: true })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", {
            required: true,
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
            required: true,
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
          sx={{
            mt: 2,
            p: "10px",
          }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
