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
          alert(JSON.stringify(userProfile));
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
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7">
              <div className="card p-3 py-4">
                <div className="text-center">
                  <div>
                    <img
                      src="/assets/images/icons/icons8-line.svg"
                      alt="Line Logo"
                    />
                  </div>
                  <img
                    src={
                      profile?.pictureUrl
                        ? profile?.pictureUrl
                        : "https://img.icons8.com/material-sharp/200/user.png"
                    }
                    width="200"
                    alt={profile?.displayName}
                    className="rounded-circle"
                  />
                </div>

                <div className="text-center mt-3">
                  <h5 className="mt-2 mb-0">{profile?.displayName}</h5>
                  <span>
                    {profile?.statusMessage
                      ? profile?.statusMessage
                      : `hey, what's up`}
                  </span>

                  {/*  */}
                </div>
              </div>
            </div>
          </div>

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
