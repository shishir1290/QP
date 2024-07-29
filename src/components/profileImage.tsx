import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const colors = ["#FF69B4", "#8A2BE2", "#1E90FF", "#00CED1", "#FF4500"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfileImage = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userToken, setUserToken] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");

    if (!accessToken || !refreshToken || Object.keys(userToken).length === 0) {
      router.push("/login");
    } else {
      setUserToken(userToken);
      setProfilePicture(userToken.profile_pic);
      setFullName(userToken.fullName);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      if(userToken.profile_pic){
        setProfilePicture(userToken.profile_pic);
      }
    }
  }, [router]);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let storedColor = localStorage.getItem("profileBgColor");
    if (!storedColor) {
      storedColor = getRandomColor();
      localStorage.setItem("profileBgColor", storedColor);
    }
    setBgColor(storedColor);
  }, []);

  const renderImage = () => {
    if (profilePicture && isValidUrl(`${Backend_url}/api/profile-pics/${profilePicture}`)) {
      return (
        <img
          src={`${Backend_url}/api/profile-pics/${profilePicture}`}
          alt="profile"
          width={isSmallScreen ? "28" : "45"}
          style={{ borderRadius: "50%" }}
        />
      );
    } else {
      const initials = fullName?.charAt(0);

      return (
        <div
          style={{
            backgroundColor: bgColor || getRandomColor(),
            width: isSmallScreen ? "26px" : "45px",
            height: isSmallScreen ? "26px" : "45px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFF",
            fontWeight: "500",
            fontSize: isSmallScreen ? "14px" : "30px",
          }}
        >
          {initials}
        </div>
      );
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
        // Create a new URL object to validate the URL
        new URL(url);
        return /^https?:\/\//i.test(url); // Ensure the URL uses HTTP or HTTPS
    } catch {
        return false;
    }
};


  return (
    <div>{renderImage()}</div>
  );
};

export default ProfileImage;
