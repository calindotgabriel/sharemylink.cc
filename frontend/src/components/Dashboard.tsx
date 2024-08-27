import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

interface ShortenLinkApiResponse {
  data: {
    shortId: string;
    originalUrl: string;
  };
}

interface ShortenLinkRequest {
  linkToShort: string;
}

interface BackgroundImage {
  url: string;
  author: string;
}

const ShareMyLink: React.FC = () => {
  const [background, setBackground] = useState<BackgroundImage | null>(null);
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random?query=abstract&orientation=landscape",
          {
            headers: {
              Authorization:
                "Client-ID dQkWLPUZah5lOJONVZ5Z0Ui9n1Mz_wO4SYmnuWs97rA",
            },
          }
        );
        setBackground({
          url: response.data.urls.full,
          author: response.data.user.name,
        });
      } catch (error) {
        console.error("Error fetching background:", error);
      }
    };

    fetchBackground();
  }, []);

  const handleShorten = async () => {
    console.log("handleShorten", { url });
    try {
      const response = await axios.post<
        ShortenLinkRequest,
        ShortenLinkApiResponse
      >(`${process.env.REACT_APP_API_URL}/short-links`, {
        linkToShort: url,
      });
      console.log("API Response:", response.data);
      setShortenedUrl(response.data.shortId);

      // Redirect to the shortened URL
      navigate(`/${response.data.shortId}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  if (!background) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${background.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 4,
            borderRadius: 2,
            maxWidth: "400px",
            marginLeft: "10%",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Share any (long) link in a smalller format!
          </Typography>
          <TextField
            fullWidth
            label="Enter URL to shorten"
            variant="outlined"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleShorten}
            fullWidth
          >
            Shorten
          </Button>
          {shortenedUrl && (
            <Typography sx={{ mt: 2 }}>
              Shortened URL: {shortenedUrl}
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            color: "white",
            textShadow: "1px 1px 2px black",
          }}
        >
          Photo by {background.author} on Unsplash
        </Typography>
      </Box>
    </Box>
  );
};

export default ShareMyLink;
