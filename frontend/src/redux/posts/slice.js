import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "./operations.js";

const initialFilters = {
  category: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    post: {},
    isLoading: false,
    isError: null,
    pagination: { page: 1, perPage: 5, totalItems: 0, totalPages: 0 },
    filters: initialFilters,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = initialFilters;
      state.pagination.page = 1;
      state.items = [];
    },

    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.pagination.page === 1) {
          state.items = action.payload.data.posts;
        } else {
          state.items = [...state.items, ...action.payload.data.posts];
        }
        state.pagination = action.payload.pagination;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to fetch post";
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.isError = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to create post";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (post) => post._id !== action.payload._id
        );
      });
  },
});

export const { setFilters, resetFilters, setPagination } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
