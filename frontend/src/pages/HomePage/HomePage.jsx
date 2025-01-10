import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/posts/operations.js";
import {
  selectFilters,
  selectPagination,
} from "../../redux/posts/selectors.js";
import PostList from "../../components/PostsList/PostList.jsx";
import Sidebar from "../../components/SideBar/SideBar.jsx";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer.jsx";
import Aside from "../../components/Aside/Aside.jsx";
import css from "./HomePage.module.css";

export const HomePage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, filters, pagination.page]);

  return (
    <div className={css.container}>
      <ResponsiveDrawer asideContent={<Aside />}>
        <main className={css.mainContent}>
          <PostList />
        </main>
        <div className={css.sidebar}>
          <Sidebar />
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default HomePage;
