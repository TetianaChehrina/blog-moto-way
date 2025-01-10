import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";

axios.defaults.baseURL = BASE_URL;

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { filters, pagination } = state.posts;

      const response = await axios.get("/posts", {
        params: {
          category: filters.category || undefined,
          page: pagination.page,
          perPage: pagination.perPage,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create post");
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/posts/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/posts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
