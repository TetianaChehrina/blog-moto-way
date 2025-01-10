import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById } from "../../redux/posts/operations.js";
import { selectCurrentPost } from "../../redux/posts/selectors.js";
import { Button, Typography, Box, Avatar, Divider } from "@mui/material";
import EditPostModal from "../../components/EditPostModal/EditPostModal.jsx";
import { BASE_URL } from "../../config.js";

const PostDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectCurrentPost);
  const isAdmin = useSelector((state) => state.auth.user?.role === "admin");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [dispatch, id]);

  if (!post) return <Typography>Loading...</Typography>;

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 5 }}>
      <Typography variant="h3" mb={2}>
        {post.title}
      </Typography>
      <Box
        component="img"
        src={`${BASE_URL}${post.imageUrl}`}
        alt={post.title}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: "auto",
          borderRadius: 2,
          mb: 4,
          objectFit: "cover",
          margin: "0 auto",
        }}
      />
      <Typography variant="body1">
        {post.content
          ? post.content.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))
          : "No content available"}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Category: {post.category}
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Avatar src="https://via.placeholder.com/150" alt="Author" />
        <Box>
          <Typography variant="subtitle1">Author: John Doe</Typography>
          <Typography variant="caption" color="text.secondary">
            Published: {new Date(post.date).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {isAdmin && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={toggleEditModal}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(deletePost(id))}
          >
            Delete
          </Button>
        </Box>
      )}

      <EditPostModal
        open={isEditModalOpen}
        onClose={toggleEditModal}
        initialData={post}
      />
    </Box>
  );
};

export default PostDetailsPage;
