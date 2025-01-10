import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PostCard from "../PostCard/PostCard.jsx";
import CreatePostModal from "../CreatePostModal/CreatePostModal.jsx";
import EditPostModal from "../EditPostModal/EditPostModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/posts/operations.js";
import {
  selectPosts,
  selectPagination,
  selectIsLoading,
  selectIsError,
} from "../../redux/posts/selectors.js";
import { setPagination } from "../../redux/posts/slice.js";
import Loader from "../Loader/Loader.jsx";
import { selectIsAdmin } from "../../redux/auth/selectors.js";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isAdmin = useSelector(selectIsAdmin);
  const pagination = useSelector(selectPagination);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const toggleCreateModal = () => {
    setIsCreateModalOpen((prev) => !prev);
  };

  const toggleEditModal = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen((prev) => !prev);
  };

  const handleDelete = async (id) => {
    await dispatch(deletePost(id)).unwrap();
  };

  const handleLoadMore = () => {
    dispatch(setPagination({ page: pagination.page + 1 }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {isAdmin && (
          <Box sx={{ paddingRight: 5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleCreateModal}
            >
              Create Post
            </Button>
          </Box>
        )}
      </Box>

      {isLoading && <Loader />}
      {isError && <Typography>Error loading posts.</Typography>}
      {posts?.length > 0 ? (
        <Box>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={() => handleDelete(post._id)}
              onEdit={() => toggleEditModal(post)}
            />
          ))}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Load More"}
            </Button>
          </Box>
        </Box>
      ) : (
        !isLoading && <Typography>No posts available</Typography>
      )}

      <CreatePostModal open={isCreateModalOpen} onClose={toggleCreateModal} />

      <EditPostModal
        open={isEditModalOpen}
        onClose={() => toggleEditModal(null)}
        initialData={currentPost}
      />
    </Box>
  );
};

export default PostList;
