import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { logOut } from "../services/api";
import { paths } from "../routes/path";

function Logout() {
  const { updateUserData } = useAuthContext();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logOut()
      .then((response) => {
        if (response.status) {
          updateUserData(null);
          navigate(paths.ROOT);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <Typography variant="h3">Welcome</Typography>
      <div style={{ margin: "30px" }} />
      <Button variant="contained" onClick={handleLogoutClick}>
        Logout
      </Button>
    </Container>
  );
}

export default Logout;
