import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { Google } from "@mui/icons-material";

const Navbar: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post("http://localhost:3001/auth/google", {
          token: response.access_token,
        });
        console.log(res.data);
        // Handle successful login (e.g., store user data in state or localStorage)
      } catch (err) {
        console.error(err);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontFamily: "Roboto",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          Share My Link
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            New Shorter Link
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => login()}
            startIcon={<div />}
          >
            Sign in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
