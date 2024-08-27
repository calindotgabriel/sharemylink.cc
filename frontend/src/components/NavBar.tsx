import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
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
        <Button color="inherit" component={RouterLink} to="/">
          New Shorter Link
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
