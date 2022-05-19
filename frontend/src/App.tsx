import { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./App.module.css";
import { AppDispatch } from "./app/store";
import { MyProfileModal } from "./components/Auth/MyProfileModal";
import { Auth } from "./features/auth/Auth";
import {
  asyncGetAllProfiles,
  asyncGetMyProfile,
  endSignIn,
  startSignIn,
} from "./features/auth/authSlice";
import { Post } from "./features/post/Post";
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
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Auth />
      <Post />
      <MyProfileModal />
      <RouterConfig />
    </div>
  );
}

export default App;
