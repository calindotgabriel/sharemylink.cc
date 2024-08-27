import React, { useEffect, useState } from "react";
import axios from "axios";

interface BackgroundImage {
  url: string;
  author: string;
}

const BackgroundArt: React.FC = () => {
  const [background, setBackground] = useState<BackgroundImage | null>(null);

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

  if (!background) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${background.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{ position: "absolute", bottom: 10, right: 10, color: "white" }}
      >
        Photo by {background.author} on Unsplash
      </div>
    </div>
  );
};

export default BackgroundArt;
