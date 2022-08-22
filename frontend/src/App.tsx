import { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./App.module.css";
import { AppDispatch } from "./app/store";
import {
  asyncGetAllProfiles,
  asyncGetFollows,
  asyncGetMyProfile,
  endSignIn,
  startSignIn,
} from "./features/auth/authSlice";
import {
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
} from "./features/post/postSlice";
import { RouterConfig } from "./Router/RouterConfig";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(endSignIn());
        const res = await dispatch(asyncGetMyProfile());
        if (asyncGetMyProfile.rejected.match(res)) {
          await dispatch(startSignIn());
          return null;
        }
        await dispatch(asyncGetAllProfiles());
        await dispatch(asyncGetAllPosts());
        await dispatch(asyncGetAllComments());
        await dispatch(asyncGetLikes());
        await dispatch(asyncGetFollows());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <RouterConfig />
    </div>
  );
}

export default App;
