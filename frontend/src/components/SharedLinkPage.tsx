import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Navbar from "./NavBar";
import { useParams, useNavigate } from "react-router-dom";

interface BackgroundImage {
  url: string;
  author: string;
}

interface ShortLinkData {
  originalUrl: string;
  shortId: string;
}

const SharedLinkPage: React.FC = () => {
  const { shortLink } = useParams<{ shortLink: string }>();
  const [background, setBackground] = useState<BackgroundImage | null>(null);
  const [linkData, setLinkData] = useState<ShortLinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(5);
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    // Start the countdown timer
    const countdownInterval = setInterval(() => {
      setRedirectCountdown((prevCount) => prevCount && prevCount - 1);
    }, 1000);

    // Set up the redirect timer
    const redirect = setTimeout(() => {
      handleVisit();
    }, 5000);

    setRedirectTimer(redirect);

    // Clean up timers on component unmount
    return () => {
      clearInterval(countdownInterval);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, []);

  useEffect(() => {
    // Redirect when countdown reaches 0
    if (redirectCountdown === 0) {
      handleVisit();
    }
  }, [redirectCountdown]);

  const cancelRedirect = () => {
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      setRedirectTimer(null);
    }
    setRedirectCountdown(null);
  };

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
        setError("Failed to load background image");
      }
    };

    const fetchLinkData = async () => {
      try {
        const response = await axios.get<ShortLinkData>(
          `${process.env.REACT_APP_API_URL}/short-links/${shortLink}`
        );
        setLinkData(response.data);
      } catch (error) {
        console.error("Error fetching link data:", error);
        // Check for a 404 error
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate("/"); // Redirect to home if link not found
        } else {
          setError("Failed to load link data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
    fetchLinkData();
  }, [shortLink]);

  const handleVisit = () => {
    if (linkData?.originalUrl) {
      let urlToOpen = linkData.originalUrl;
      // let urlToOpen = "localhost/" + linkData.shortId;

      // Check if the URL starts with http:// or https://
      if (!/^https?:\/\//i.test(urlToOpen)) {
        // If not, prepend https:// (you can change this to http:// if preferred)
        urlToOpen = "https://" + urlToOpen;
      }

      window.open(urlToOpen, "_blank");
    }
  };

  const handleCopy = () => {
    if (linkData?.originalUrl) {
      navigator.clipboard
        .writeText(linkData.originalUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${background?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 4,
            borderRadius: 2,
            maxWidth: "600px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            You have been shared a link in a smaller format!
          </Typography>
          {redirectCountdown !== null && (
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Typography variant="body1" paragraph fontWeight="bold">
                Redirecting in {redirectCountdown} seconds...
              </Typography>
            </Box>
          )}

          <Typography variant="body1" paragraph>
            Original URL:
          </Typography>
          <Typography variant="body1" paragraph fontWeight="bold">
            {formatHttp(linkData?.originalUrl)}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleVisit}>
              Visit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCopy}>
              Copy
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={cancelRedirect}
            >
              Cancel Redirect
            </Button>
          </Box>
        </Box>
      </Box>
      {background && (
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
      )}
    </Box>
  );
};

const formatHttp = (url: string | undefined) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export default SharedLinkPage;
