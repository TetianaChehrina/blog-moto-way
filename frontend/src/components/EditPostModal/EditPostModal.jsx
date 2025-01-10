import { useEffect, useState } from "react";
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
import { updatePost } from "../../redux/posts/operations";

const EditPostModal = ({ open, onClose, onPostUpdated, initialData }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
        category: initialData.category || "",
      });
      setImage(initialData.imageUrl || null);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      if (image && typeof image !== "string") {
        data.append("image", image);
      }

      await dispatch(updatePost({ id: initialData._id, data })).unwrap();
      toast.success("Post updated successfully!");
      onPostUpdated?.();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update post.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Toaster />
      <DialogTitle>Edit Post</DialogTitle>
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
        <FormControl
          fullWidth
          margin="normal"
          sx={{
            minWidth: 120,
          }}
        >
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
