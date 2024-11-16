import React, { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignIn: React.FC = () => {
  const CLIENT_ID =
    "597889139500-mjjuu39tcofqrqkgscmna3k40k3pq196.apps.googleusercontent.com";

  useEffect(() => {
    // Initialize the Google Identity Services library and render the button
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse, // Callback after successful login
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" } // Customize button
    );
  }, [CLIENT_ID]);

  // Handle the response after Google sign-in
  const handleCredentialResponse = (response: any) => {
    console.log("ID Token:", response.credential);
    // Further process the ID token if needed (e.g., send it to backend or store in localStorage)
  };

  return (
    <div>
      <h1>Sign in with Google</h1>
      <div id="googleSignInButton"></div>{" "}
      {/* Google Sign-In button will render here */}
    </div>
  );
};

export default GoogleSignIn;
