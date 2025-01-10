import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "../../redux/posts/operations";

const CreatePostModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.error("Only image files are allowed!");
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      if (image) data.append("image", image);

      await dispatch(createPost(data)).unwrap();
      toast.success("Post created successfully!");

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create post.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Toaster />
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          </Select>
        </FormControl>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
