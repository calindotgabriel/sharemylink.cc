// src/components/SignInButton.tsx
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignInButton: React.FC = () => {
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

  return <button onClick={() => login()}>Sign in with Google</button>;
};

export default SignInButton;
