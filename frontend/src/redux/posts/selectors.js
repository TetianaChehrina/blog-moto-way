export const selectPosts = (state) => state.posts.items || [];
export const selectPost = (state) => state.posts.post;
export const selectFilters = (state) => state.posts.filters;
export const selectPagination = (state) => state.posts.pagination || {};
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectIsError = (state) => state.posts.isError;
export const selectCurrentPost = (state) => state.posts.post;
