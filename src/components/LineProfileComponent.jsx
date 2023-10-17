import React, { useState, useEffect } from "react";
import liff from "@line/liff";

function LineProfileComponent() {
  const myLiffId = "2001073406-74eKPLm9";
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const sendMessageToFriend = (message) => {
    if (liff.isInClient()) {
      liff
        .sendMessages([
          {
            type: "text",
            text: message,
          },
        ])
        .then(() => {
          console.log("Message sent");
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } else {
      // User is accessing the app outside of the LINE app, handle accordingly.
      console.log("User is not in the LINE app");
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      if (liff.isLoggedIn()) {
        try {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      } else {
        liff.login();
      }
    }

    // Make sure to initialize LIFF first
    if (liff.isInClient() && !liff.isInitialized()) {
      liff.init(
        { liffId: myLiffId },
        () => {
          fetchProfile();
        },
        (error) => {
          console.error("LIFF initialization failed", error);
        }
      );
    } else {
      fetchProfile();
    }
  }, []); // Empty dependency array ensures this useEffect runs once after component mounts.

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.pictureUrl} alt={profile.displayName} />
          <p>{profile.displayName}</p>
          <p>{profile.statusMessage}</p>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => sendMessageToFriend(message)}>
            Send Message
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LineProfileComponent;
