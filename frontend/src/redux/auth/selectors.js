export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsError = (state) => state.auth.isError;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";
