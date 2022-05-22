import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllProfiles } from "../../features/auth/authSlice";
import { defaultImage } from "../../types/auth_types";
import { PROPS_PROF_CARD } from "../../types/search_types";

export const ProfResultCard = (props: PROPS_PROF_CARD) => {
  const { prof_id } = props;

  const allProfiles = useSelector(selectAllProfiles);

  const relatedProf = allProfiles.find((prof) => prof.id === prof_id);

  return (
    <>
      {prof_id === "" ? null : (
        <Link
          to={`/${relatedProf?.user_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box
            width="200px"
            height="250px"
            mx={2}
            my={3}
            py={2}
            sx={{ border: "solid 1px black", borderRadius: "20px" }}
          >
            <Box
              display="flex"
              height="100%"
              width="100%"
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <img
                src={
                  relatedProf?.prof_image
                    ? relatedProf.prof_image
                    : defaultImage
                }
                alt="search prof"
                width="80px"
                height="80px"
                style={{
                  borderRadius: "50%",
                  border: "solid 1px #c5c5c5",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Box
                  display="flex"
                  mb={1}
                  sx={{ flexDirection: "column", justifyContent: "flex-start" }}
                >
                  <p>ユーザー名</p>
                  <h4>{relatedProf?.username}</h4>
                </Box>
                <Box
                  display="flex"
                  mb={1}
                  sx={{ flexDirection: "column", justifyContent: "flex-start" }}
                >
                  <p>ユーザーID</p>
                  <h4>@{relatedProf?.user_id}</h4>
                </Box>
                <Box
                  display="flex"
                  mb={1}
                  sx={{ flexDirection: "column", justifyContent: "flex-start" }}
                >
                  <p>年齢</p>
                  <h4>{relatedProf?.age} 歳</h4>
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      )}
    </>
  );
};
