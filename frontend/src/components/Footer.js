import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import theme from "../assets/theme";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.forth.main,
        color: "#333",
        padding: "16px 0",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} Have Your Say. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link to="/privacy" style={{ textDecoration: "none", color: "inherit", marginRight: "8px" }}>
          Privacy Policy
        </Link>
        |
        <Link to="/terms" style={{ textDecoration: "none", color: "inherit", marginLeft: "8px" }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
