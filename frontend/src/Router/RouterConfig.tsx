import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "../features/search/SearchPage";
import { Core } from "../features/core/Core";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Core />} />
          <Route path="/search/" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
