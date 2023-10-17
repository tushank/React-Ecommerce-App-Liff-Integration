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
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.12708 7.49988C1.12708 3.98026 3.98029 1.12704 7.49991 1.12704C11.0195 1.12704 13.8727 3.98026 13.8727 7.49988C13.8727 11.0195 11.0195 13.8727 7.49991 13.8727C3.98029 13.8727 1.12708 11.0195 1.12708 7.49988ZM7.49991 2.07704C4.50496 2.07704 2.07708 4.50493 2.07708 7.49988C2.07708 8.8854 2.59669 10.1496 3.45169 11.1081C4.35364 9.84763 5.83061 9.02499 7.50026 9.02499C9.16972 9.02499 10.6465 9.84744 11.5485 11.1077C12.4033 10.1492 12.9227 8.88518 12.9227 7.49988C12.9227 4.50493 10.4948 2.07704 7.49991 2.07704ZM10.8486 11.7655C10.1262 10.6851 8.89586 9.97499 7.50026 9.97499C6.1045 9.97499 4.87407 10.6853 4.15165 11.7659C5.07362 12.4905 6.23629 12.9227 7.49991 12.9227C8.76373 12.9227 9.92659 12.4904 10.8486 11.7655ZM5.15002 6.50488C5.15002 5.20701 6.20215 4.15488 7.50002 4.15488C8.79789 4.15488 9.85002 5.20701 9.85002 6.50488C9.85002 7.80275 8.79789 8.85488 7.50002 8.85488C6.20215 8.85488 5.15002 7.80275 5.15002 6.50488ZM7.50002 5.10488C6.72683 5.10488 6.10002 5.73168 6.10002 6.50488C6.10002 7.27808 6.72683 7.90488 7.50002 7.90488C8.27322 7.90488 8.90002 7.27808 8.90002 6.50488C8.90002 5.73168 8.27322 5.10488 7.50002 5.10488Z"
                        fill="currentColor"
                      />
                    </svg>
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
