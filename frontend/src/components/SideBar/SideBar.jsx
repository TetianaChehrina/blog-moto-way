import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { setFilters, resetFilters } from "../../redux/posts/slice.js";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [localFilters, setLocalFilters] = useState({
    category: "",
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      category: localFilters.category,
    },
  });

  useEffect(() => {
    setValue("category", localFilters.category);
  }, [localFilters, setValue]);

  const onSubmit = (data) => {
    setLocalFilters(data);
    dispatch(setFilters(data));
    console.log("Submitted filters:", data);
  };

  const handleReset = () => {
    setLocalFilters({ category: "" });
    reset();
    dispatch(resetFilters());
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            value={localFilters.category}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, category: e.target.value })
            }
          >
            <FormControlLabel
              value="Technology"
              control={<Radio />}
              label="Technology"
              {...register("category")}
            />
            <FormControlLabel
              value="Travel"
              control={<Radio />}
              label="Travel"
              {...register("category")}
            />
            <FormControlLabel
              value="Lifestyle"
              control={<Radio />}
              label="Lifestyle"
              {...register("category")}
            />
          </RadioGroup>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              flexGrow: 1,
              padding: { xs: "10px", sm: "12px", md: "12px" },
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{
              flexGrow: 1,
              padding: { xs: "10px", sm: "12px", md: "12px" },
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Sidebar;
