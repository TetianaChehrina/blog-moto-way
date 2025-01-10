import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const PostDetailCard = ({ post, onDelete, onEdit }) => {
  const { _id, title, content, category, date } = post;
  const isAdmin = useSelector((state) => state.auth.user?.role === "admin");
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 2,
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          maxWidth: 150,
          maxHeight: 150,
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0 auto",
        }}
        image={`${BASE_URL}${post.imageUrl}`}
        alt={post.title}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(date).toLocaleDateString()} • {category}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {content.slice(0, 100)}...
          </Typography>
        </CardContent>
        <Box
          sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outlined" onClick={() => navigate(`/posts/${_id}`)}>
            Read More
          </Button>
          {isAdmin && (
            <Box>
              <IconButton color="primary" onClick={() => onEdit(post)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(post._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default PostDetailCard;
