import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SearchPage } from "../features/search/SearchPage";
import { Core } from "../features/core/Core";
import { UserDetailPage } from "../features/userDetail/UserDetailPage";
import { useLayoutEffect } from "react";
import { Auth } from "../features/auth/Auth";
import { Post } from "../features/post/Post";
import { MyProfileModal } from "../components/Auth/MyProfileModal";
import { Follow } from "../features/userDetail/Follow";
import { Follower } from "../features/userDetail/Follower";

const Wrapper = (props: any) => {
  const { children } = props;
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route index element={<Core />} />
            <Route path="/search/" element={<SearchPage />} />
            <Route path="/:user_id" element={<UserDetailPage />} />
            <Route path="/:user_id/follow/" element={<Follow />} />
            <Route path="/:user_id/follower/" element={<Follower />} />
          </Routes>
        </Wrapper>
        <>
          <Auth />
          <Post />
          <MyProfileModal />
        </>
      </BrowserRouter>
    </>
  );
};
