import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";

const HomePage: React.FC = () => {
  const location = useLocation();
  const { sharedLink } = queryString.parse(location.search);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log({ sharedLink });
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      if (sharedLink && typeof sharedLink === "string") {
        try {
          const response = await axios.get(
            `${config.API_URL}/short-links/${sharedLink}`
          );
          setOriginalUrl(response.data.originalUrl);
        } catch (err) {
          setError("Failed to fetch the original URL");
          console.error("Error fetching original URL:", err);
        }
      }
    };

    fetchOriginalUrl();
  }, [sharedLink]);

  if (error) {
    console.error("Error:", error);
  }

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {originalUrl && <p>2) You have been shared the link: {originalUrl}</p>}
    </div>
  );
};

export default HomePage;
