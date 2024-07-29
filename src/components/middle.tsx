import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Jwt, { JwtPayload } from "jsonwebtoken";
import Post from "./Post";
import Loading from "./loading";
import ShowStories from "./showStory";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const colors = ["#FF69B4", "#8A2BE2", "#1E90FF", "#00CED1", "#FF4500"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

interface Emoji {
  emoji: string;
  name: string;
}

interface StoryImage {
  _id: string;
  image: string;
  image_scale: string;
  image_position_x: string;
  image_position_y: string;
  background_color: string;
  createdAt: string;
  user_id: string;
  // Add other properties as needed
}

const MiddleBar = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userToken, setUserToken] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(""); // Add user ID state
  const [storyImage, setStoryImage] = useState<StoryImage[]>([]);

  const [fstshowPopup, setfstShowPopup] = useState(false);
  const [secshowPopup, setsecShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  const [allPosts, setAllPosts] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      // setLoading(true); // Moved here to avoid setting it multiple times
      const res = await axios.get(
        `${Backend_url}/api/get-all-users-posts?page=${pageNo}&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data) {
        setAllPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
        setHasMore(res.data.posts.length > 0);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and error cases
    }
  }, [Backend_url, accessToken, pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1 // Adjusted for potential off-by-one issues
      ) {
        if (!loading && hasMore) {
          setPageNo((prevPageNo) => prevPageNo + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const emojis: Emoji[] = [
    { emoji: "likeemoji.png", name: "Like" },
    { emoji: "heartemoji.png", name: "Love" },
    { emoji: "hahaemoji.png", name: "Haha" },
    { emoji: "wowemoji.png", name: "Wow" },
    { emoji: "sademoji.png", name: "Sad" },
    { emoji: "angryemoji.png", name: "Angry" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setfstShowPopup(false);
        setsecShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");

    if (!accessToken || !refreshToken || Object.keys(userToken).length === 0) {
      router.push("/login");
    } else {
      const decoded = Jwt.decode(accessToken) as JwtPayload;
      setUserId(decoded.userId);
      setAccessToken(accessToken);
      setUserToken(userToken);
      setProfilePicture(userToken.profile_pic);
      setFullName(userToken.fullName);
      setFirstName(userToken.first_name);
      setLastName(userToken.last_name);
    }
  }, [router]);

  useEffect(() => {
    const findStory = async () => {
      try {
        const response = await axios.get(
          `${Backend_url}/api/story/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          setStoryImage(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userId && accessToken) {
      findStory();
    }
  }, [userId, accessToken]);

  

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

  const renderImage1 = () => {
    if (
      profilePicture &&
      isValidUrl(`${Backend_url}/api/profile-pics/${profilePicture}`)
    ) {
      return (
        <img
          src={`${Backend_url}/api/profile-pics/${profilePicture}`}
          alt="profile"
          width={isSmallScreen ? "28" : "45"}
          style={{ borderRadius: "50%" }}
        />
      );
    } else {
      const initials = fullName?.charAt(0) || "U";

      return (
        <div
          style={{
            backgroundColor: getRandomColor(),
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
      new URL(url);
      return /^https?:\/\//i.test(url);
    } catch {
      return false;
    }
  };




  



  

  // const timeDifference = calculateTimeAgo(storyImage);

  // 🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱

  // 🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱

  return (
    <div className="w-full sm:w-1/2">
      <div className="bg-white mt-1">
        <div className="flex items-center justify-center p-2 space-x-8">
          {/* profile pic */}
          <div>{renderImage1()}</div>
          {/* search bar */}
          <div>
            <div className="w-[220.14px] sm:w-[701px] h-[40.34px] sm:h-[49px] pl-[15px] pr-[15px] sm:pr-[274px] py-3.5 bg-zinc-100 rounded-[10px] sm:rounded-[22px] justify-center items-center flex">
              <div className="w-full text-sm text-neutral-400 whitespace-nowrap overflow-hidden overflow-ellipsis">
                What’s on your mind, {lastName}?
              </div>
            </div>
          </div>
          {/* photos */}
          <div className="block sm:hidden">
            <div className="w-10 h-10 bg-zinc-100 rounded-[10px] flex justify-center items-center">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <g id="Group_2">
                    <g id="Group_3">
                      <path
                        id="Vector"
                        d="M10.4089 7.31183C9.25112 7.31183 8.3125 8.27952 8.3125 9.47328C8.3125 10.667 9.25107 11.6347 10.4089 11.6347C11.5667 11.6347 12.5053 10.667 12.5053 9.47328C12.5053 8.27952 11.5667 7.31183 10.4089 7.31183ZM10.4089 10.6054C9.80243 10.6054 9.31079 10.0985 9.31079 9.47324C9.31079 8.84794 9.80243 8.34104 10.4089 8.34104C11.0154 8.34104 11.507 8.84794 11.507 9.47324C11.507 10.0985 11.0154 10.6054 10.4089 10.6054Z"
                        fill="#212223"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector_2"
                        d="M18.7683 2.37164L5.14184 0.776362C4.61298 0.698842 4.07716 0.85802 3.6694 1.21381C3.26169 1.53975 3.00034 2.0229 2.94565 2.5518L2.6961 4.66175H1.92238C0.824264 4.66175 0.00067445 5.66524 0.00067445 6.79741V17.3214C-0.0269839 18.401 0.799471 19.2994 1.84667 19.3279C1.87189 19.3286 1.89716 19.3287 1.92238 19.3284H15.6237C16.7219 19.3284 17.7201 18.4535 17.7201 17.3214V16.9097C18.0606 16.8419 18.3836 16.7016 18.6685 16.498C19.0729 16.147 19.3318 15.6499 19.3923 15.1085L20.5403 4.66175C20.6573 3.52697 19.8675 2.50615 18.7683 2.37164ZM16.7219 17.3214C16.7219 17.8874 16.1728 18.2991 15.6237 18.2991H1.92238C1.42639 18.3142 1.01252 17.9118 0.997953 17.4004C0.997188 17.3741 0.997523 17.3477 0.998956 17.3214V15.4173L4.86731 12.4839C5.33201 12.1161 5.98654 12.1488 6.41465 12.5611L9.13496 15.0313C9.54807 15.3889 10.0681 15.5888 10.6074 15.5974C11.0292 15.6027 11.4439 15.4869 11.8054 15.2629L16.7219 12.3295V17.3214H16.7219ZM16.7219 11.1202L11.2812 14.388C10.8141 14.6734 10.2227 14.6217 9.80875 14.2594L7.0635 11.7635C6.27669 11.0664 5.12669 11.0237 4.29326 11.6605L0.998956 14.1307V6.79741C0.998956 6.23132 1.37332 5.69099 1.92238 5.69099H15.6237C16.2103 5.71606 16.6841 6.1934 16.7219 6.79741V11.1202ZM19.543 4.52282C19.5426 4.52621 19.5423 4.52966 19.542 4.53306L18.369 14.9798C18.371 15.2507 18.2512 15.5073 18.0445 15.6746C17.9447 15.7775 17.7201 15.829 17.7201 15.8804V6.79741C17.6807 5.62519 16.761 4.6883 15.6237 4.66175H3.69433L3.91895 2.65474C3.96767 2.39484 4.09947 2.15932 4.29331 1.98571C4.51219 1.82969 4.77683 1.75694 5.04205 1.77985L18.6436 3.40088C19.1924 3.45462 19.5951 3.95693 19.543 4.52282Z"
                        fill="#212223"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* post */}
      <div className="bg-white mt-[2px] hidden sm:block">
        <div className="flex justify-center p-4">
          <div className="flex justify-between items-center space-x-48">
            {/* live video */}
            <div className="flex justify-center items-center space-x-2">
              {/* video icon */}
              <div className="relative flex justify-center items-center">
                <div>
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
                      d="M5.41667 19.3334H14.0833C17.0701 19.3334 19.5 16.7165 19.5 13.5V6.50002C19.5 3.28352 17.0701 0.666687 14.0833 0.666687H5.41667C2.42992 0.666687 0 3.28352 0 6.50002V13.5C0 16.7165 2.42992 19.3334 5.41667 19.3334ZM26 5.69852V14.2374C26 15.1205 25.545 15.9139 24.8116 16.3082C24.505 16.4727 24.1757 16.5544 23.8485 16.5544C23.3924 16.5544 22.9418 16.3969 22.5604 16.0889C22.5203 16.0562 21.6667 15.1439 21.6667 15.1439V4.80135C21.6667 4.80135 22.5182 3.88085 22.5604 3.84702C23.2148 3.31735 24.076 3.23219 24.8116 3.62769C25.5472 4.02319 26 4.81535 26 5.69852Z"
                      fill="#EE2C4D"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </svg>
                </div>
                <div className=" absolute pr-[4.5px]">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="eye 1">
                      <path
                        id="Vector"
                        d="M11.9104 4.65875C11.4714 3.85875 9.74993 1.25 5.99993 1.25C2.24994 1.25 0.528436 3.85875 0.0894356 4.65875C0.0305048 4.76596 0 4.8825 0 5.00042C0 5.11834 0.0305048 5.23487 0.0894356 5.34208C0.528436 6.14125 2.24994 8.75 5.99993 8.75C9.74993 8.75 11.4714 6.14125 11.9104 5.34125C11.9692 5.23416 11.9997 5.11777 11.9997 5C11.9997 4.88223 11.9692 4.76584 11.9104 4.65875ZM5.99993 7.5C5.40659 7.5 4.82657 7.35338 4.33322 7.07867C3.83988 6.80397 3.45536 6.41352 3.2283 5.95671C3.00123 5.49989 2.94182 4.99723 3.05758 4.51227C3.17333 4.02732 3.45906 3.58186 3.87861 3.23223C4.29817 2.8826 4.83272 2.6445 5.41466 2.54804C5.99661 2.45157 6.59981 2.50108 7.14798 2.6903C7.69616 2.87952 8.1647 3.19995 8.49434 3.61107C8.82399 4.0222 8.99993 4.50555 8.99993 5C8.99914 5.66284 8.68281 6.29834 8.12038 6.76704C7.55794 7.23573 6.79534 7.49934 5.99993 7.5Z"
                        fill="#242526"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector_2"
                        d="M6 7C7.10457 7 8 6.10457 8 5C8 3.89543 7.10457 3 6 3C4.89543 3 4 3.89543 4 5C4 6.10457 4.89543 7 6 7Z"
                        fill="#EE2C4D"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div className="w-[75px] h-[15px] text-zinc-400 text-sm font-semibold font-['Poppins']">
                  Live Video
                </div>
              </div>
            </div>

            {/* Photo/video */}
            <div className="flex justify-center items-center space-x-2">
              {/* photo icon */}
              <div className="relative flex justify-center items-center">
                <img src="/icons/photo.png" alt="photo" />
              </div>
              <div>
                <div className="w-[75px] h-[15px] text-zinc-400 text-sm font-semibold font-['Poppins']">
                  Photo/Video
                </div>
              </div>
            </div>

            {/* Feeling/activity */}
            <div className="flex justify-center items-center space-x-2">
              {/* photo icon */}
              <div className="relative flex justify-center items-center">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="26"
                  height="26"
                  viewBox="0 0 225 225"
                  enable-background="new 0 0 225 225"
                >
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    fill="#FEFEFE"
                    opacity="1.000000"
                    stroke="none"
                    d="
M123.000000,226.000000 
	C82.000000,226.000000 41.500004,226.000000 1.000005,226.000000 
	C1.000004,151.000000 1.000004,76.000015 1.000002,1.000015 
	C75.999992,1.000010 150.999985,1.000010 225.999969,1.000005 
	C225.999985,75.999985 225.999985,150.999969 226.000000,225.999969 
	C191.833328,226.000000 157.666672,226.000000 123.000000,226.000000 
M123.076416,10.186235 
	C113.139328,10.755342 103.016190,10.299373 93.295982,12.063489 
	C38.941044,21.928339 1.322196,76.799095 11.224279,131.053009 
	C21.676987,188.323822 74.999046,225.442886 132.153915,215.235672 
	C206.849991,201.895782 242.226379,114.331062 197.602859,52.955883 
	C179.420105,27.947336 154.612762,14.021380 123.076416,10.186235 
z"
                  />
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    fill="#F6B83C"
                    opacity="1.000000"
                    stroke="none"
                    d="
M123.531097,10.254028 
	C154.612762,14.021380 179.420105,27.947336 197.602859,52.955883 
	C242.226379,114.331062 206.849991,201.895782 132.153915,215.235672 
	C74.999046,225.442886 21.676987,188.323822 11.224279,131.053009 
	C1.322196,76.799095 38.941044,21.928339 93.295982,12.063489 
	C103.016190,10.299373 113.139328,10.755342 123.531097,10.254028 
M109.500008,127.048767 
	C107.001709,127.048767 104.503403,127.048782 102.005104,127.048782 
	C85.682808,127.048805 69.360443,127.023766 53.038235,127.061081 
	C46.446102,127.076149 44.625427,129.426849 46.417313,135.754913 
	C47.406918,139.249710 48.630371,142.694778 49.985279,146.067093 
	C62.512142,177.245911 92.841194,195.527786 125.703362,189.636398 
	C155.071579,184.371368 173.103790,165.216553 181.904236,137.149521 
	C184.413940,129.145401 182.547211,127.049957 173.957108,127.049301 
	C152.804749,127.047691 131.652374,127.048767 109.500008,127.048767 
M149.799561,61.210983 
	C133.703049,63.294338 130.575546,85.556160 139.759811,95.236687 
	C143.588684,99.272446 148.008347,101.301628 153.562057,100.254707 
	C162.076340,98.649689 167.862061,90.062561 167.369705,79.902138 
	C166.841858,69.008957 160.581299,62.015709 149.799561,61.210983 
M71.929390,61.963112 
	C64.086082,64.149643 59.200954,69.928719 58.389336,78.961182 
	C57.664417,87.028801 59.870487,94.389626 67.230904,98.650627 
	C70.086807,100.303947 74.334000,100.916664 77.589935,100.252075 
	C86.190422,98.496574 91.773148,88.553101 90.410095,78.858406 
	C88.857430,67.815094 82.700020,61.882351 71.929390,61.963112 
z"
                  />
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    fill="#FEFEFE"
                    opacity="1.000000"
                    stroke="none"
                    d="
M110.000015,127.048767 
	C131.652374,127.048767 152.804749,127.047691 173.957108,127.049301 
	C182.547211,127.049957 184.413940,129.145401 181.904236,137.149521 
	C173.103790,165.216553 155.071579,184.371368 125.703362,189.636398 
	C92.841194,195.527786 62.512142,177.245911 49.985279,146.067093 
	C48.630371,142.694778 47.406918,139.249710 46.417313,135.754913 
	C44.625427,129.426849 46.446102,127.076149 53.038235,127.061081 
	C69.360443,127.023766 85.682808,127.048805 102.005104,127.048782 
	C104.503403,127.048782 107.001709,127.048767 110.000015,127.048767 
z"
                  />
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    fill="#FCFCFC"
                    opacity="1.000000"
                    stroke="none"
                    d="
M150.204834,61.196037 
	C160.581299,62.015709 166.841858,69.008957 167.369705,79.902138 
	C167.862061,90.062561 162.076340,98.649689 153.562057,100.254707 
	C148.008347,101.301628 143.588684,99.272446 139.759811,95.236687 
	C130.575546,85.556160 133.703049,63.294338 150.204834,61.196037 
z"
                  />
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    fill="#FBFBFB"
                    opacity="1.000000"
                    stroke="none"
                    d="
M72.349777,61.912598 
	C82.700020,61.882351 88.857430,67.815094 90.410095,78.858406 
	C91.773148,88.553101 86.190422,98.496574 77.589935,100.252075 
	C74.334000,100.916664 70.086807,100.303947 67.230904,98.650627 
	C59.870487,94.389626 57.664417,87.028801 58.389336,78.961182 
	C59.200954,69.928719 64.086082,64.149643 72.349777,61.912598 
z"
                  />
                </svg>
              </div>
              <div>
                <div className="w-[75px] h-[15px] text-zinc-400 text-sm font-semibold font-['Poppins']">
                  Feeling/activity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ShowStories />
      

      {/* News  */}
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white">
          {allPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiddleBar;
