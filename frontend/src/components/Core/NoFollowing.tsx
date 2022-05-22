import { Link } from "react-router-dom";

export const NoFollowing = () => {
  return (
    <div style={{ margin: "170px auto" }}>
      <p style={{ fontSize: "28px", marginBottom: "10px" }}>
        フォローしてTwitterをたのしもう!
      </p>
      <Link to="/search/" style={{ textDecoration: "none", color: "#535353" }}>
        <div style={{ textAlign: "center" }}>
          ユーザー検索・ツイート検索はこちら
        </div>
      </Link>
    </div>
  );
};
